"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import VibeRandomizer from "@/components/VibeRandomizer";
import { useState } from "react";

export default function GameScreen() {
  const router = useRouter();
  const [seed, setSeed] = useState("Ykbw");
  const [roomCode, setRoomCode] = useState("");
  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col items-center justify-center p-4 mt-24'>
        <VibeRandomizer initialSeed={seed} onSeedChange={setSeed} />
      </div>
      <div className='flex flex-col items-center justify-center p-4'>
        <input
          type='text'
          placeholder='Room code'
          maxLength={4}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400 [&:not(:placeholder-shown)]:uppercase'
        />
      </div>
      <div className='flex flex-col items-center justify-center px-4'>
        <input
          type='text'
          placeholder='Your name'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
        />
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <button
          onClick={() => router.push(`/${roomCode}`)}
          className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Join room
        </button>
      </div>
    </div>
  );
}
