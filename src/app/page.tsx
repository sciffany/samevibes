"use client";

import { useRouter } from "next/navigation";

export default function GameScreen() {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-[#2e9ca9] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
      <div className='flex-1 flex flex-col items-center justify-center gap-8'>
        <h1 className='text-6xl font-bold text-[#fdfbee] font-sans'>
          samevibes
        </h1>
        <p className='text-xl text-[#fdfbee]'>
          Find the link. Pull the trigger.
        </p>

        <button
          onClick={() => router.push("/host")}
          className='bg-[#fdfbee] text-[#0d2c40] px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Host Game
        </button>

        <button
          onClick={() => router.push("/player")}
          className='bg-[#0d2c40] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Play Game
        </button>
      </div>
    </div>
  );
}
