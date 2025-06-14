"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VibeRandomizer from "@/components/VibeRandomizer";
import { ref, set, get } from "firebase/database";
import { database } from "@/firebase";

export default function GameScreen() {
  const router = useRouter();
  const [seed, setSeed] = useState("Ykbw");
  const [name, setName] = useState("");

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400 text-center'
        />
      </div>

      <div className='flex flex-col items-center justify-center p-4'>
        <button
          onClick={async () => {
            if (!name) {
              alert("Please enter your name");
              return;
            }

            // generate 4 consonants letters without symbols and check if room exists
            const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
            let roomCode: string = "";
            let roomExists = true;

            while (roomExists) {
              roomCode = Array.from({ length: 4 }, () =>
                consonants.charAt(Math.floor(Math.random() * consonants.length))
              ).join("");

              // check if room exists
              const roomRef = ref(database, `samevibes/rooms/${roomCode}`);
              const snapshot = await get(roomRef);
              roomExists = snapshot.exists();
            }

            // create a room in firebase
            const roomRef = ref(database, `samevibes/rooms/${roomCode}`);
            set(roomRef, {
              name: roomCode,
              host: name,
              players: {
                [name]: {
                  name: name,
                  vibe: seed,
                },
              },
            });

            // set local storage
            localStorage.setItem("samevibes-room", roomCode);
            localStorage.setItem("samevibes-name", name);

            router.push(`/${roomCode}`);
          }}
          className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Create room
        </button>
      </div>
    </div>
  );
}
