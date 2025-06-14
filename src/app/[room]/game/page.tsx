"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect } from "react";
import { ref, get, onValue, off, remove, update } from "firebase/database";
import { database } from "@/firebase";

export default function GameScreen() {
  const router = useRouter();
  const { room } = useParams();
  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  const [players, setPlayers] = useState<
    Record<string, { name: string; vibe: string }>
  >({});
  const [host, setHost] = useState<string>("");

  useEffect(() => {
    const roomRef = ref(database, `samevibes/rooms/${room}`);

    // Subscribe to room updates
    onValue(roomRef, (snapshot) => {
      setRoomExists(snapshot.exists());
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPlayers(data.players || {});
        setHost(data.host || "");
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
        <div className='text-sm w-1/3'>Phase 1</div>
        <div className='text-xl font-semibold w-1/3 text-center'>samevibes</div>
      </header>

      <main className='max-w-md mx-auto p-6 space-y-6'>
        {/* Mission */}
        <div>
          <h2 className='font-bold text-lg'>Mission:</h2>
          <p>Hit yourself and Sophia, but not Yipin</p>
        </div>

        <hr className='border-t border-[#2e9ca9]' />

        {/* Prompt */}
        <div>
          <h3 className='font-semibold text-md'>
            What do you all have in common?
          </h3>
          <p className='text-sm text-gray-600'>They have learned this…</p>
        </div>

        {/* Answer input */}
        <input
          type='text'
          placeholder='A language or musical instrument'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
        />

        {/* People targets */}
        <div className='space-y-2'>
          <div className='w-full border border-gray-300 rounded-md p-3 bg-white'>
            Yourself
          </div>
          <div className='w-full border border-gray-300 rounded-md p-3 bg-white'>
            Sophia
          </div>
          <div className='w-full border border-gray-300 rounded-md p-3 bg-white flex justify-between items-center'>
            <span>Yipin</span>
            <span className='text-red-500 text-xl'>🚫</span>
          </div>
        </div>
      </main>
    </div>
  );
}
