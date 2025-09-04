import { useEffect, useState } from "react";
import {
  joinWithAnd,
  Mission,
  Target,
  useVerbBasedOnPlayerCount,
} from "@/app/data/missions";
import PlayerScreen from "./PlayerScreen";
import { useParams, useRouter } from "next/navigation";
import cuid from "cuid";
import { database } from "@/firebase";
import { ref, set, push } from "firebase/database";
import NopePlayerScreen from "./NopePlayerScreen";
import DisplayPlayerScreen from "./DisplayPlayerScreen";

interface MissionScreenProps {
  missions: Mission[];
  currentMissionIndex: number;
  onMissionChange: (index: number) => void;
  players: Record<string, { name: string; vibe: string }>;
}

export interface MissionAnswer {
  id: string;
  level: 1 | 2;
  answer: string;
  targets: Target[];
  missionId: number;
  submitter: string;
  hitUser?: boolean;
  hitUsers?: {
    [name: string]: boolean;
  };
}

export default function MissionScreen({
  missions,
  currentMissionIndex,
  onMissionChange,
  players,
}: MissionScreenProps) {
  const router = useRouter();
  const { room } = useParams();

  const [missionAnswers, setMissionAnswers] = useState<MissionAnswer[]>([]);

  useEffect(() => {
    if (missions.length > 0) {
      setMissionAnswers(
        missions.map((mission) => ({
          id: cuid(),
          level: 1,
          answer: "",
          targets: mission.targets,
          missionId: mission.id,
          submitter: localStorage.getItem("samevibes-name") || "",
        }))
      );
    }
  }, [missions]);

  async function handleSubmit() {
    // Write mission answers to room in firebase
    for (const missionAnswer of missionAnswers) {
      await set(
        ref(
          database,
          `samevibes/rooms/${room}/missionAnswers/${missionAnswer.id}`
        ),
        missionAnswer
      );
    }

    // Write 'submitted' in players object
    const playersRef = ref(
      database,
      `samevibes/rooms/${room}/players/${localStorage.getItem(
        "samevibes-name"
      )}/submitted`
    );
    await set(playersRef, true);

    router.push(`/${room}/wait/submitted`);
  }

  const handleNext = () => {
    if (currentMissionIndex < missions.length - 1) {
      onMissionChange(currentMissionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentMissionIndex > 0) {
      onMissionChange(currentMissionIndex - 1);
    }
  };

  const currentMission = missions[currentMissionIndex];
  const currentAnswer = missionAnswers[currentMissionIndex];

  // Check if all missions have answers
  const allMissionsFilled = missionAnswers.every(
    (answer) => answer.answer.trim() !== ""
  );

  const updateMissionAnswer = (
    index: number,
    updates: Partial<MissionAnswer>
  ) => {
    setMissionAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = { ...newAnswers[index], ...updates };
      return newAnswers;
    });
  };

  if (!currentMission || !currentAnswer) {
    return (
      <div className='min-h-screen bg-[#fdfbee] text-[#0d2c40] font-sans flex flex-col items-center justify-center'>
        <p className='text-xl text-[#2e9ca9] font-semibold'>Loading...</p>
      </div>
    );
  }

  return (
    <main className='max-w-md mx-auto p-10 space-y-6 flex-1 w-full'>
      {/* Prompt */}
      <div>
        <h3 className='font-semibold text-lg text-center'>
          {currentMission.targets.filter((target) => target.type === "hit")
            .length === currentMission.targets.length
            ? "All"
            : ""}{" "}
          {currentMission.targets.filter((target) => target.type === "hit")
            .length > 0 &&
          currentMission.targets.filter((target) => target.type === "hit")
            .length < currentMission.targets.length
            ? "Only"
            : ""}{" "}
          {currentMission.targets.filter((target) => target.type === "hit")
            .length === 0 && "Nobody"}{" "}
          {/* People targets */}
          <DisplayPlayerScreen
            players={Object.fromEntries(
              currentMission.targets
                .filter((target) => target.type === "hit")
                .map((target: Target) => {
                  return [
                    target.name,
                    { name: target.name, vibe: target.vibe },
                  ];
                })
            )}
          />
          {useVerbBasedOnPlayerCount(
            currentMission.descriptionTemplate.verb,
            currentMission.targets.filter((target) => target.type === "hit")
              .length
          )}{" "}
          {currentMission.descriptionTemplate.prompt}
        </h3>
      </div>
      {/* Level selection */}
      {/* <div className='flex gap-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name={`level-${currentMissionIndex}`}
            checked={currentAnswer.level === 1}
            onChange={() =>
              updateMissionAnswer(currentMissionIndex, { level: 1 })
            }
            className='w-4 h-4'
          />
          <span>Prompt 1</span>
        </label>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name={`level-${currentMissionIndex}`}
            checked={currentAnswer.level === 2}
            onChange={() =>
              updateMissionAnswer(currentMissionIndex, { level: 2 })
            }
            className='w-4 h-4'
          />
          <span>Prompt 2</span>
        </label>
      </div> */}

      {/* <b>
        {currentAnswer.level === 1
          ? currentMission.descriptionTemplate.level1
          : currentMission.descriptionTemplate.level2}
      </b> */}
      {/* Answer input */}
      <input
        type='text'
        value={currentAnswer.answer}
        onChange={(e) =>
          updateMissionAnswer(currentMissionIndex, { answer: e.target.value })
        }
        className='w-full p-3 border border-gray-300 rounded-md placeholder:text-gray-400'
      />

      <NopePlayerScreen
        players={Object.fromEntries(
          currentMission.targets
            .filter((target) => target.type !== "hit")
            .map((target: Target) => {
              return [target.name, { name: target.name, vibe: target.vibe }];
            })
        )}
      />

      {/* Navigation buttons */}
      <div className='flex justify-between items-center mt-6'>
        <button
          onClick={handleBack}
          disabled={currentMissionIndex === 0}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            currentMissionIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#2e9ca9] text-white hover:bg-[#25808a]"
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={currentMissionIndex === missions.length - 1}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            currentMissionIndex === missions.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#2e9ca9] text-white hover:bg-[#25808a]"
          }`}
        >
          Next
        </button>
      </div>

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

      {/* Submit button - appears below navigation when all missions are filled */}
      {allMissionsFilled && (
        <div className='flex justify-center mt-4'>
          <button
            onClick={handleSubmit}
            className='bg-[#2e9ca9] text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
          >
            Submit
          </button>
        </div>
      )}
    </main>
  );
}
