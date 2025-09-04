import Image from "next/image";

export default function NopePlayerScreen({
  players,
  playerName,
}: {
  players: Record<
    string,
    { name: string; vibe: string; type?: string; wasHit?: boolean }
  >;
  playerName?: string;
}) {
  return (
    <div className='flex justify-end py-2 gap-x-5 flex-wrap'>
      {Object.entries(players).map(([playerId, player]) => (
        <div
          key={playerId}
          style={{
            maxWidth: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className='relative'>
            <Image
              className={`rounded-xl ${
                playerName && player.name === playerName
                  ? "ring-4 ring-black rounded-xl"
                  : ""
              }`}
              src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${player.vibe}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
              alt={`${player.name}'s vibe`}
              width={30}
              height={30}
            />
            {/* Red X mark overlay */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-red-500 text-4xl font-bold'>✕</div>
            </div>
          </div>
          <p className='text-[10px] mt-2 text-[#2e9ca9] font-semibold'>
            {player.name}
          </p>
        </div>
      ))}
    </div>
  );
}
