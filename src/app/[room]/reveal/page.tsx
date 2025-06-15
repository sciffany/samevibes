"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/firebase";
import RevealScreen from "@/app/components/RevealScreen";
import { MissionAnswer } from "@/app/components/MissionScreen";

export default function GameScreen() {
  const router = useRouter();
  const { room } = useParams();
  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  const [missionAnswers, setMissionAnswers] = useState<MissionAnswer[]>([]);
  const [currentMissionAnswerIndex, setCurrentMissionAnswerIndex] = useState(0);

  useEffect(() => {
    const roomRef = ref(database, `samevibes/rooms/${room}`);

    // Subscribe to room updates
    onValue(roomRef, (snapshot) => {
      setRoomExists(snapshot.exists());
      if (snapshot.exists()) {
        const data = snapshot.val() as {
          missionAnswers: Record<string, MissionAnswer>;
        };
        setMissionAnswers(Object.values(data.missionAnswers));
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
        <div className='text-sm w-1/3'>Phase 3</div>
        <div className='text-xl font-semibold w-1/3 text-center'>samevibes</div>
        <div className='text-sm w-1/3 text-right'>
          {currentMissionAnswerIndex + 1}/{missionAnswers.length}
        </div>
      </header>
      <RevealScreen
        missionAnswers={missionAnswers}
        index={currentMissionAnswerIndex}
        onIndexChange={setCurrentMissionAnswerIndex}
      />
    </div>
  );
}
