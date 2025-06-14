"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VibeRandomizer from "@/components/VibeRandomizer";

export default function GameScreen() {
  const router = useRouter();
  const [seed, setSeed] = useState("Ykbw");

  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col items-center justify-center p-4 mt-24'>
        <VibeRandomizer initialSeed={seed} onSeedChange={setSeed} />
      </div>
      <div className='flex flex-col items-center justify-center px-4'>
        <input
          type='text'
          placeholder='Your name'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400 text-center'
        />
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <button
          onClick={() => {
            // generate 4 consonants letters without symbols
            const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
            const code = Array.from({ length: 4 }, () =>
              consonants.charAt(Math.floor(Math.random() * consonants.length))
            ).join("");
            router.push(`/${code}`);
          }}
          className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Create room
        </button>
      </div>
    </div>
  );
}
