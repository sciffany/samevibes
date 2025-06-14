"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const generateRandomSeed = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const newSeed = Array.from({ length: 4 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
  console.log(newSeed);
  return newSeed;
};

export default function GameScreen() {
  const router = useRouter();
  const [seed, setSeed] = useState("Ykbw");

  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col items-center justify-center p-4 mt-24'>
        <div className='flex items-center gap-4 flex-col'>
          <Image
            className='rounded-2xl shadow-lg'
            src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}`}
            alt='logo'
            width={100}
            height={100}
          />
          <button
            onClick={() => setSeed(generateRandomSeed())}
            className='bg-[#2e9ca9] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#25808a] transition-colors'
          >
            Randomize
          </button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center px-4'>
        <input
          type='text'
          placeholder='your name'
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400 lowercase text-center'
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
          Create Room
        </button>
      </div>
    </div>
  );
}
