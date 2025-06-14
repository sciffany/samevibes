"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import VibeRandomizer from "@/components/VibeRandomizer";
import { useState } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "@/firebase";

export default function GameScreen() {
  const router = useRouter();
  const [seed, setSeed] = useState("Ykbw");
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  const handleJoinRoom = async () => {
    if (!roomCode || !name) {
      alert("Please enter both room code and your name");
      return;
    }

    // Check if room exists
    const roomRef = ref(database, `samevibes/rooms/${roomCode}`);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      alert("Room does not exist");
      return;
    }

    // check if player already exists
    const playersRef = ref(database, `samevibes/rooms/${roomCode}/players`);
    const playersSnapshot = await get(playersRef);
    const players = playersSnapshot.val();
    if (players[name]) {
      alert("You are already in this room");
      return;
    }

    // add player to room
    const playerRef = ref(
      database,
      `samevibes/rooms/${roomCode}/players/${name}`
    );
    set(playerRef, {
      name: name,
      vibe: seed,
    });

    // Save to local storage
    localStorage.setItem("samevibes-room", roomCode);
    localStorage.setItem("samevibes-name", name);

    // Proceed to room
    router.push(`/${roomCode}`);
  };

  return (
    <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans'>
      <header className='bg-[#2e9ca9] text-white text-center py-4 text-xl font-semibold'>
        samevibes
      </header>

      <div className='flex flex-col items-center justify-center p-4 mt-24'>
        <VibeRandomizer initialSeed={seed} onSeedChange={setSeed} />
      </div>
      <div className='flex flex-col items-center justify-center px-4 pb-4'>
        <input
          type='text'
          placeholder='Room code'
          maxLength={4}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400 [&:not(:placeholder-shown)]:uppercase text-center'
        />
      </div>
      <div className='flex flex-col items-center justify-center px-4'>
        <input
          type='text'
          placeholder='Your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400 text-center'
        />
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <button
          onClick={handleJoinRoom}
          className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Join room
        </button>
      </div>
    </div>
  );
}
