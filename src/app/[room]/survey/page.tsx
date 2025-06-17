"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ref, onValue, off, set, get } from "firebase/database";
import { database } from "@/firebase";
import { MissionAnswer } from "@/app/components/MissionScreen";
import { descriptionTemplates, fisherYatesShuffle } from "@/app/data/missions";
import cuid from "cuid";

export default function GameScreen() {
  const router = useRouter();
  const { room } = useParams();
  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  const [missionAnswers, setMissionAnswers] = useState<MissionAnswer[]>([]);

  const handleContinue = async () => {
    const scores: { [submitter: string]: number } = {};

    for (const answer of missionAnswers) {
      // Hitting a hit
      if (
        answer.hitUser &&
        answer.targets.filter(
          (target) =>
            target.name === localStorage.getItem("samevibes-name") &&
            target.type === "hit"
        ).length > 0
      ) {
        if (!scores[answer.submitter]) {
          scores[answer.submitter] = 0;
        }
        scores[answer.submitter] += 5;
      }

      // Avoiding a hit
      if (
        !answer.hitUser &&
        answer.targets.filter(
          (target) =>
            target.name === localStorage.getItem("samevibes-name") &&
            target.type === "avoid"
        ).length > 0
      ) {
        if (!scores[answer.submitter]) {
          scores[answer.submitter] = 0;
        }
        scores[answer.submitter] += 5;
      }

      if (answer.hitUser) {
        set(
          ref(
            database,
            `samevibes/rooms/${room}/missionAnswers/${
              answer.id
            }/hitUsers/${localStorage.getItem("samevibes-name")}`
          ),
          true
        );
      }
    }

    for (const submitter of Object.keys(scores)) {
      set(
        ref(database, `samevibes/rooms/${room}/scores/${submitter}/${cuid()}`),
        scores[submitter]
      );
    }

    // Write 'surveyed' in players object
    const playersRef = ref(
      database,
      `samevibes/rooms/${room}/players/${localStorage.getItem(
        "samevibes-name"
      )}/surveyed`
    );
    await set(playersRef, true);

    router.push(`/${room}/wait/surveyed`);
  };

  useEffect(() => {
    const roomRef = ref(database, `samevibes/rooms/${room}/missionAnswers`);

    // Read mission answers from firebase
    get(roomRef).then((snapshot) => {
      setRoomExists(snapshot.exists());
      if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, MissionAnswer>;

        const missionAnswers = Object.values(data);

        fisherYatesShuffle(missionAnswers);

        setMissionAnswers(
          missionAnswers.map((answer) => ({
            ...answer,
            hitUser: false,
          }))
        );
      }
    });
  }, [room]);

  if (roomExists === null) {
    return (
      <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
        <p className='text-xl text-[#2e9ca9] font-semibold'>Loading...</p>
      </div>
    );
  }

  if (!roomExists) {
    return (
      <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
        <p className='text-xl text-[#2e9ca9] font-semibold'>Room not found</p>
        <button
          onClick={() => router.push("/host")}
          className='mt-4 bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Host game
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col'>
      <header className='flex bg-[#2e9ca9] text-white py-4 text-xl font-semibold items-center p-4'>
        <div className='text-sm w-1/3'>Phase 2</div>

        <div className='text-xl font-semibold w-1/3 text-center'>samevibes</div>
      </header>

      <main className='p-6 space-y-6 flex-1'>
        <div>
          <h2 className='font-bold text-lg text-center'>Verification Time!</h2>
          <p className='text-center'>
            Which of these are true about you,{" "}
            {localStorage.getItem("samevibes-name")}?
          </p>
        </div>
        <hr className='border-t border-[#2e9ca9]' />

        <div className='space-y-4 text-[#fdfbee] flex flex-col'>
          {missionAnswers.map((answer, index) => (
            <div
              key={index}
              className='flex items-start space-x-3 justify-between'
            >
              <input
                checked={answer.hitUser}
                onChange={(e) => {
                  setMissionAnswers(
                    missionAnswers.map((a) =>
                      a.id === answer.id
                        ? { ...a, hitUser: e.target.checked }
                        : a
                    )
                  );
                }}
                type='checkbox'
                id={`mission-${index}`}
                className='mt-1 h-4 w-4 rounded border-gray-300 text-[#2e9ca9] focus:ring-[#2e9ca9]'
              />
              <label
                htmlFor={`mission-${index}`}
                className='text text-[#0d2c40] w-full'
              >
                {generateQuestionFromMission(
                  answer.missionId,
                  answer.answer,
                  answer.level
                )}
              </label>
            </div>
          ))}
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleContinue}
            className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}

function generateQuestionFromMission(
  missionId: number,
  answer: string,
  points: number
): React.ReactNode {
  const mission = descriptionTemplates.find(
    (mission) => mission.id === missionId
  );

  if (!mission) {
    return null;
  }

  return (
    <div>
      You {mission?.verb} {mission?.prompt} {answer}
    </div>
  );
}
