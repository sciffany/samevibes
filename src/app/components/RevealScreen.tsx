import { useState } from "react";
import {
  descriptionTemplates,
  joinWithAnd,
  useVerbBasedOnPlayerCount,
} from "@/app/data/missions";
import { MissionAnswer } from "./MissionScreen";
import PlayerScreen from "./PlayerScreen";
import { useParams, useRouter } from "next/navigation";
import { ref, remove } from "firebase/database";
import { database } from "@/firebase";

export default function RevealScreen({
  index,
  missionAnswers,
  onIndexChange,
  scores,
}: {
  index: number;
  missionAnswers: MissionAnswer[];
  onIndexChange: (index: number) => void;
  scores: Record<string, number>;
}) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { room } = useParams();
  const router = useRouter();

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && index < missionAnswers.length) {
      onIndexChange(index + 1);
    }
    if (isRightSwipe && index > 0) {
      onIndexChange(index - 1);
    }
  };

  // Show congratulations screen if we're at the end
  if (index === missionAnswers.length) {
    const handleEndGame = async () => {
      if (!room) return;
      await remove(ref(database, `samevibes/rooms/${room}`));
      router.push("/");
    };
    return (
      <main
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className='max-w-md mx-auto p-6 space-y-6 flex-1 flex flex-col items-center justify-center text-center'
      >
        <h2 className='font-bold text-2xl text-[#2e9ca9] mb-4'>
          🎉 Congratulations! 🎉
          <br />
          {Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map(([submitter, score]) => (
              <p key={submitter}>
                {submitter} -&gt; {score} pts
              </p>
            ))}
          <br />
        </h2>
        <button
          onClick={handleEndGame}
          className='mt-4 bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          End Game
        </button>
        {/* Mission progress dots */}
        <div className='flex justify-center space-x-2 mt-4'>
          {[...missionAnswers, {}].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-[#2e9ca9]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </main>
    );
  }

  const currentMissionAnswer = missionAnswers[index];

  return (
    <main
      className='max-w-md mx-auto p-6 space-y-6 flex-1'
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mission */}
      <div>
        <h2 className='font-bold text-lg'>Reveal {index + 1}</h2>
        <h3 className='text-sm text-[#2e9ca9]'>
          {currentMissionAnswer.submitter}'s MISSION WAS
        </h3>
        <p>{generateMissionRecall(currentMissionAnswer)}</p>
      </div>

      <hr className='border-t border-[#2e9ca9]' />
      <div>
        <h3 className='text-sm text-[#2e9ca9]'>
          FOR {currentMissionAnswer.level === 1 ? "1 POINT" : "2 POINTS"} PER
          TARGET, {currentMissionAnswer.submitter} THINKS...
        </h3>
        <p>{generateMissionAnswerString(currentMissionAnswer)}</p>
      </div>

      <hr className='border-t border-[#2e9ca9]' />

      <div>
        <h3 className='text-sm text-[#2e9ca9]'>SURVEY SAYS...</h3>
        <p>{generateHitList(currentMissionAnswer)}</p>
      </div>

      {/* Player list */}
      <PlayerScreen
        players={Object.fromEntries(
          currentMissionAnswer.targets.map((target) => [
            target.name,
            {
              name: target.name,
              vibe: target.vibe,
              type: target.type,
              wasHit: Object.hasOwn(
                currentMissionAnswer.hitUsers ?? {},
                target.name
              ),
            },
          ])
        )}
      />

      <div className='flex flex-row items-center justify-between'>
        <h3 className='text-sm text-[#2e9ca9]'>
          {currentMissionAnswer.submitter}'s accuracy:{" "}
        </h3>
        <p>
          {" "}
          {calculateAccuracy(currentMissionAnswer)} /{" "}
          {Object.values(currentMissionAnswer.targets).length} x{" "}
          {currentMissionAnswer.level === 1 ? "1" : "2"} ={" "}
          {calculateAccuracy(currentMissionAnswer) *
            (currentMissionAnswer.level === 1 ? 1 : 2)}{" "}
          pts
        </p>
      </div>

      {/* Mission progress dots */}
      <div className='flex justify-center space-x-2 mt-4'>
        {[...missionAnswers, {}].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-[#2e9ca9]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </main>
  );
}

function generateMissionRecall(missionAnswer: MissionAnswer) {
  const targetsToHit = missionAnswer.targets.filter(
    (target) => target.type === "hit"
  );

  return `Only ${joinWithAnd(
    targetsToHit.map((target) => target.name)
  )}  ${useVerbBasedOnPlayerCount(
    descriptionTemplates[missionAnswer.missionId - 1].verb,
    targetsToHit.length
  )} ${descriptionTemplates[missionAnswer.missionId - 1].prompt} (${
    missionAnswer.level === 1
      ? descriptionTemplates[missionAnswer.missionId - 1].level1
      : descriptionTemplates[missionAnswer.missionId - 1].level2
  })`;
}

function generateMissionAnswerString(missionAnswer: MissionAnswer) {
  const targetsToHit = missionAnswer.targets.filter(
    (target) => target.type === "hit"
  );

  return `Only ${joinWithAnd(
    targetsToHit.map((target) => target.name)
  )}  ${useVerbBasedOnPlayerCount(
    descriptionTemplates[missionAnswer.missionId - 1].verb,
    targetsToHit.length
  )}  ${descriptionTemplates[missionAnswer.missionId - 1].prompt} ${
    missionAnswer.answer
  }`;
}

function generateHitList(missionAnswer: MissionAnswer) {
  const hitUsers = Object.keys(missionAnswer.hitUsers ?? {});

  return `${joinWithAnd(hitUsers)}  ${useVerbBasedOnPlayerCount(
    descriptionTemplates[missionAnswer.missionId - 1].verb,
    hitUsers.length
  )}  ${descriptionTemplates[missionAnswer.missionId - 1].prompt} ${
    missionAnswer.answer
  }`;
}

function calculateAccuracy(missionAnswer: MissionAnswer) {
  const accuracy = missionAnswer.targets.reduce((acc, target) => {
    if (
      target.type === "hit" &&
      Object.hasOwn(missionAnswer.hitUsers ?? {}, target.name)
    ) {
      acc++;
    } else if (
      target.type === "avoid" &&
      !Object.hasOwn(missionAnswer.hitUsers ?? {}, target.name)
    ) {
      acc++;
    }
    return acc;
  }, 0);
  return accuracy;
}
