import Image from "next/image";

export default function PlayerScreen({
  players,
  playerName,
}: {
  players: Record<string, { name: string; vibe: string; type?: string }>;
  playerName?: string;
}) {
  return (
    <div className='flex flex-col items-center justify-center py-4 gap-2 grid grid-cols-4'>
      {Object.entries(players).map(([playerId, player]) => (
        <div key={playerId} className={`flex flex-col items-center`}>
          <Image
            className={`rounded-xl ${
              playerName && player.name === playerName
                ? "ring-4 ring-black rounded-xl"
                : ""
            }`}
            src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${player.vibe}`}
            alt={`${player.name}'s vibe`}
            width={80}
            height={380}
          />
          <p className='text-lg mt-2 text-[#2e9ca9] font-semibold'>
            {player.name}
          </p>
        </div>
      ))}
    </div>
  );
}
