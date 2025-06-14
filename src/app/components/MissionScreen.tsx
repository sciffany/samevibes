import { useState } from "react";
import { Mission } from "@/app/data/missions";
import PlayerScreen from "./PlayerScreen";
import { useParams } from "next/navigation";

interface MissionScreenProps {
  missions: Mission[];
  currentMissionIndex: number;
  onMissionChange: (index: number) => void;
  players: Record<string, { name: string; vibe: string }>;
}

export default function MissionScreen({
  missions,
  currentMissionIndex,
  players,
  onMissionChange,
}: MissionScreenProps) {
  const { room } = useParams();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentMissionIndex < missions.length - 1) {
      onMissionChange(currentMissionIndex + 1);
    }
    if (isRightSwipe && currentMissionIndex > 0) {
      onMissionChange(currentMissionIndex - 1);
    }
  };

  const currentMission = missions[currentMissionIndex];

  return (
    <main
      className='max-w-md mx-auto p-6 space-y-6 flex-1'
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Mission */}
      <div>
        <h2 className='font-bold text-lg'>Mission {currentMission.id}</h2>
        <p>{currentMission.missionString}</p>
      </div>

      <hr className='border-t border-[#2e9ca9]' />

      {/* Prompt */}
      {/* <div>
        <h3 className='font-semibold text-md'>{currentMission.prompt}</h3>
        <p className='text-sm text-gray-600'>{currentMission.hint}</p>
      </div> */}

      {/* Answer input */}
      {/* <input
        type='text'
        placeholder={currentMission.placeholder}
        className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
      /> */}

      {/* People targets */}
      <PlayerScreen
        players={Object.fromEntries(
          currentMission.targets.map((target) => {
            return [target.name, { name: target.name, vibe: target.vibe }];
          })
        )}
      />

      {/* Mission progress dots */}
      <div className='flex justify-center space-x-2 mt-4'>
        {missions.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentMissionIndex ? "bg-[#2e9ca9]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {currentMissionIndex === missions.length - 1 && (
        <div className='flex justify-center'>
          <button className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'>
            Submit
          </button>
        </div>
      )}
    </main>
  );
}
