"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/firebase";
import PlayerScreen from "../components/PlayerScreen";

export default function GameScreen() {
  const router = useRouter();
  const { room } = useParams();
  const [roomExists, setRoomExists] = useState<boolean | null>(null);
  const [players, setPlayers] = useState<
    Record<string, { name: string; vibe: string }>
  >({});
  const [host, setHost] = useState<string>("");

  useEffect(() => {
    const roomRef = ref(database, `samevibes/rooms/${room}`);

    // Subscribe to room updates
    onValue(roomRef, (snapshot) => {
      setRoomExists(snapshot.exists());
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPlayers(data.players || {});
        setHost(data.host || "");
      }
    });

    // Cleanup subscription and update player status on unmount
    return () => {
      off(roomRef);
    };
  }, [room]);

  if (roomExists === null) {
    return (
      <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
        <p className='text-xl text-[#2e9ca9] font-semibold'>Loading...</p>
      </div>
    );
  }

  if (!roomExists) {
    return (
      <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
        <p className='text-xl text-[#2e9ca9] font-semibold'>Room not found</p>
        <button
          onClick={() => router.push("/host")}
          className='mt-4 bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          Host game
        </button>
      </div>
    );
  }

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
            <PlayerScreen
              players={players}
              playerName={localStorage.getItem("samevibes-name") || ""}
            />
          </div>
        </div>

        {host === localStorage.getItem("samevibes-name") && (
          <div className='flex flex-col items-center justify-center p-4'>
            <button
              onClick={() => router.push(`/${room}/game`)}
              className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
