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
        <div key={playerId} className={`flex flex-col items-center relative`}>
          <div className='relative'>
            <Image
              className={`rounded-xl ${
                playerName && player.name === playerName
                  ? "ring-4 ring-black rounded-xl"
                  : ""
              }`}
              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${player.vibe}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
              alt={`${player.name}'s vibe`}
              width={80}
              height={380}
            />
            {player.type === "hit" && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[60px] h-[60px] rounded-full border-4 border-red-500 absolute'></div>
                <div className='w-[40px] h-[40px] rounded-full border-4 border-red-500 absolute'></div>
                <div className='w-[20px] h-[20px] rounded-full border-4 border-red-500 absolute'></div>
              </div>
            )}
          </div>
          <p className='text-lg mt-2 text-[#2e9ca9] font-semibold'>
            {player.name}
          </p>
        </div>
      ))}
    </div>
  );
}
