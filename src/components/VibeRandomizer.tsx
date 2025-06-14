import Image from "next/image";
import { useState } from "react";

const generateRandomSeed = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const newSeed = Array.from({ length: 4 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
  return newSeed;
};

interface VibeRandomizerProps {
  initialSeed?: string;
  onSeedChange?: (seed: string) => void;
}

export default function VibeRandomizer({
  initialSeed = "Ykbw",
  onSeedChange,
}: VibeRandomizerProps) {
  const [seed, setSeed] = useState(initialSeed);

  const handleSeedChange = () => {
    const newSeed = generateRandomSeed();
    setSeed(newSeed);
    onSeedChange?.(newSeed);
  };

  return (
    <div className='flex items-center gap-4 flex-col'>
      <Image
        className='rounded-2xl shadow-lg'
        src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}`}
        alt='vibe avatar'
        width={100}
        height={100}
      />
      <button
        onClick={handleSeedChange}
        className='bg-[#2e9ca9] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#25808a] transition-colors'
      >
        Switch vibe
      </button>
    </div>
  );
}
