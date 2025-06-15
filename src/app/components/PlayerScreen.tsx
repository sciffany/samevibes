import Image from "next/image";

export default function PlayerScreen({
  players,
  playerName,
}: {
  players: Record<
    string,
    { name: string; vibe: string; type?: string; wasHit?: boolean }
  >;
  playerName?: string;
}) {
  console.log(players);
  return (
    <div className='flex flex-col items-center justify-center py-2 gap-2 grid grid-cols-4'>
      {Object.entries(players).map(([playerId, player]) => (
        <div key={playerId} className={`flex flex-col items-center relative`}>
          {player.wasHit && (
            <div className='absolute top-5 left-1/2 transform -translate-x-1/2 z-10'>
              <svg
                width='40'
                height='40'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z'
                  fill='#000000'
                  stroke='#000000'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z'
                  fill='#000000'
                  stroke='#000000'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  transform='rotate(45 12 12)'
                />
              </svg>
            </div>
          )}
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
