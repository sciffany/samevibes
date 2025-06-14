"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function GameScreen() {
  const router = useRouter();
  const { room } = useParams();
  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col justify-between flex-1 p-4'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-sm text-[#2e9ca9] font-semibold'>Room Code</p>
          <p className='text-4xl text-[#2e9ca9] font-semibold'>{room}</p>
          <div className='flex flex-col items-center justify-center p-4 mt-4'>
            <p className='text-sm text-[#2e9ca9] font-semibold'>Players</p>
            <div className='flex flex-col items-center justify-center p-4 gap-2'>
              <p className='text-xl text-[#2e9ca9] font-semibold'>Player 1</p>
              <p className='text-xl text-[#2e9ca9] font-semibold'>Player 2</p>
              <p className='text-xl text-[#2e9ca9] font-semibold'>Player 3</p>
              <p className='text-xl text-[#2e9ca9] font-semibold'>Player 4</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center p-4'>
          <button
            onClick={() => router.push("/game")}
            className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
