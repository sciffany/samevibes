"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function GameScreen() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col items-center justify-center p-4'>
        <DotLottieReact src='logo.lottie' loop autoplay />
      </div>

      <div className='flex flex-col items-center justify-center px-4'>
        <input
          type='text'
          placeholder='your name'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
        />
      </div>

      {!roomCode && (
        <div className='flex flex-col items-center justify-center p-4'>
          <button
            onClick={() => {
              // generate 4 capital letters without symbols
              const code = Math.random()
                .toString(36)
                .toUpperCase()
                .replace(/[^A-Z]/g, "")
                .substring(2, 6);
              setRoomCode(code);
            }}
            className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
          >
            Create Room
          </button>
        </div>
      )}

      {roomCode && (
        <>
          <div className='flex flex-col items-center justify-center p-4'>
            <p className='text-xl text-gray-500'>Room Code: {roomCode}</p>
          </div>

          <div className='flex flex-col items-center justify-center p-4'>
            <button
              onClick={() => router.push("/game")}
              className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
            >
              Start Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}
