"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/firebase";
import { MissionAnswer } from "@/app/components/MissionScreen";
import { descriptionTemplates, fisherYatesShuffle } from "@/app/data/missions";

export default function GameScreen() {
  const router = useRouter();
  const { room } = useParams();
  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  const [missionAnswers, setMissionAnswers] = useState<MissionAnswer[]>([]);

  useEffect(() => {
    const roomRef = ref(database, `samevibes/rooms/${room}`);

    // Subscribe to room updates
    onValue(roomRef, (snapshot) => {
      setRoomExists(snapshot.exists());
      if (snapshot.exists()) {
        const data = snapshot.val() as {
          missionAnswers: Record<string, MissionAnswer>;
        };
        const shuffledMissionAnswers = fisherYatesShuffle(
          Object.values(data.missionAnswers)
        );
        setMissionAnswers(shuffledMissionAnswers);
      }
    });

    // Cleanup subscription and update player status on unmount
    return () => {
      off(roomRef);
    };
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
            onClick={() => router.push(`/${room}/wait/surveyed`)}
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
) {
  const mission = descriptionTemplates.find(
    (mission) => mission.id === missionId
  );
  return (
    "You " +
    mission?.verb +
    " " +
    mission?.prompt +
    " " +
    answer +
    " " +
    `(${points === 1 ? mission?.level1 : mission?.level2})`
  );
}
