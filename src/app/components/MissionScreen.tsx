import { useEffect, useState } from "react";
import {
  joinWithAnd,
  Mission,
  Target,
  useVerbBasedOnPlayerCount,
} from "@/app/data/missions";
import PlayerScreen from "./PlayerScreen";
import { useParams, useRouter } from "next/navigation";
import cuid from "cuid";
import { database } from "@/firebase";
import { ref, set, push } from "firebase/database";

interface MissionScreenProps {
  missions: Mission[];
  currentMissionIndex: number;
  onMissionChange: (index: number) => void;
  players: Record<string, { name: string; vibe: string }>;
}

export interface MissionAnswer {
  id: string;
  level: 1 | 2;
  answer: string;
  targets: Target[];
  missionId: number;
  submitter: string;
  hitUser?: boolean;
  hitUsers?: {
    [name: string]: boolean;
  };
}

export default function MissionScreen({
  missions,
  currentMissionIndex,
  onMissionChange,
  players,
}: MissionScreenProps) {
  const router = useRouter();
  const { room } = useParams();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [missionAnswers, setMissionAnswers] = useState<MissionAnswer[]>([]);

  useEffect(() => {
    if (missions.length > 0) {
      setMissionAnswers(
        missions.map((mission) => ({
          id: cuid(),
          level: 1,
          answer: "",
          targets: mission.targets,
          missionId: mission.id,
          submitter: localStorage.getItem("samevibes-name") || "",
        }))
      );
    }
  }, [missions]);

  async function handleSubmit() {
    // Write mission answers to room in firebase
    for (const missionAnswer of missionAnswers) {
      await set(
        ref(
          database,
          `samevibes/rooms/${room}/missionAnswers/${missionAnswer.id}`
        ),
        missionAnswer
      );
    }

    // Write 'submitted' in players object
    const playersRef = ref(
      database,
      `samevibes/rooms/${room}/players/${localStorage.getItem(
        "samevibes-name"
      )}/submitted`
    );
    await set(playersRef, true);

    router.push(`/${room}/wait/submitted`);
  }

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

    if (isLeftSwipe && currentMissionIndex < missions.length - 1) {
      onMissionChange(currentMissionIndex + 1);
    }
    if (isRightSwipe && currentMissionIndex > 0) {
      onMissionChange(currentMissionIndex - 1);
    }
  };

  const currentMission = missions[currentMissionIndex];
  const currentAnswer = missionAnswers[currentMissionIndex];

  const updateMissionAnswer = (
    index: number,
    updates: Partial<MissionAnswer>
  ) => {
    setMissionAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = { ...newAnswers[index], ...updates };
      return newAnswers;
    });
  };

  if (!currentMission || !currentAnswer) {
    return (
      <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
        <p className='text-xl text-[#2e9ca9] font-semibold'>Loading...</p>
      </div>
    );
  }

  return (
    <main
      className='max-w-md mx-auto p-6 space-y-6 flex-1'
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mission */}
      <div>
        <h2 className='font-bold text-lg'>Mission {currentMissionIndex + 1}</h2>
        <p>{currentMission.missionString}</p>
      </div>
      <hr className='border-t border-[#2e9ca9]' />
      {/* Prompt */}
      <div>
        <h3 className='font-semibold text-md'>
          {currentMission.targets.filter((target) => target.type === "hit")
            .length === currentMission.targets.length
            ? "All"
            : ""}{" "}
          {currentMission.targets.filter((target) => target.type === "hit")
            .length > 0 &&
          currentMission.targets.filter((target) => target.type === "hit")
            .length < currentMission.targets.length
            ? "Only"
            : ""}{" "}
          {joinWithAnd(
            currentMission.targets
              .filter((target) => target.type === "hit")
              .map((target) => target.name)
          )}{" "}
          {useVerbBasedOnPlayerCount(
            currentMission.descriptionTemplate.verb,
            currentMission.targets.filter((target) => target.type === "hit")
              .length
          )}{" "}
          {currentMission.descriptionTemplate.prompt}
        </h3>
      </div>
      {/* Level selection */}
      {/* <div className='flex gap-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name={`level-${currentMissionIndex}`}
            checked={currentAnswer.level === 1}
            onChange={() =>
              updateMissionAnswer(currentMissionIndex, { level: 1 })
            }
            className='w-4 h-4'
          />
          <span>Prompt 1</span>
        </label>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name={`level-${currentMissionIndex}`}
            checked={currentAnswer.level === 2}
            onChange={() =>
              updateMissionAnswer(currentMissionIndex, { level: 2 })
            }
            className='w-4 h-4'
          />
          <span>Prompt 2</span>
        </label>
      </div> */}

      {/* <b>
        {currentAnswer.level === 1
          ? currentMission.descriptionTemplate.level1
          : currentMission.descriptionTemplate.level2}
      </b> */}
      {/* Answer input */}
      <input
        type='text'
        placeholder={`${currentMission.descriptionTemplate.level1} or ${currentMission.descriptionTemplate.level2}`}
        value={currentAnswer.answer}
        onChange={(e) =>
          updateMissionAnswer(currentMissionIndex, { answer: e.target.value })
        }
        className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
      />

      {/* People targets */}
      <PlayerScreen
        players={Object.fromEntries(
          currentMission.targets.map((target) => {
            return [
              target.name,
              { name: target.name, vibe: target.vibe, type: target.type },
            ];
          })
        )}
      />
      {/* Mission progress dots */}
      <div className='flex justify-center space-x-2 mt-4'>
        {missions.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentMissionIndex ? "bg-[#2e9ca9]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      {currentMissionIndex === missions.length - 1 && (
        <div className='flex justify-center' onClick={handleSubmit}>
          <button className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'>
            Submit
          </button>
        </div>
      )}
    </main>
  );
}
