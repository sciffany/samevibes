"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function GameScreen() {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col items-center justify-center p-4'>
        <DotLottieReact src='logo.lottie' loop autoplay />
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <input
          type='text'
          placeholder='room code'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
        />
      </div>
      <div className='flex flex-col items-center justify-center px-4'>
        <input
          type='text'
          placeholder='your name'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
        />
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <button
          onClick={() => router.push("/game")}
          className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
