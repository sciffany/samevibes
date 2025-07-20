import { useState } from "react";
import { descriptionTemplates } from "../data/missions";
import { MissionAnswer } from "./MissionScreen";
import Image from "next/image";

export default function SurveyScreen({
  missionAnswers,
  setMissionAnswers,
}: {
  missionAnswers: MissionAnswer[];
  setMissionAnswers: (missionAnswers: MissionAnswer[]) => void;
}) {
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);

  return (
    <>
      <div className='space-y-4 text-[#fdfbee] flex flex-col'>
        {missionAnswers[currentSurveyIndex] && (
          <div
            key={missionAnswers[currentSurveyIndex].id}
            className='flex items-start space-x-3 justify-between '
          >
            <div
              key={missionAnswers[currentSurveyIndex].submitter}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: 80,
              }}
            >
              <Image
                src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${missionAnswers[currentSurveyIndex].submitter}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt={`${missionAnswers[currentSurveyIndex].submitter}'s vibe`}
                width={50}
                height={50}
              />

              <p className='text-lg mt-2 text-[#2e9ca9] font-semibold text-center text-sm'>
                {missionAnswers[currentSurveyIndex].submitter} {"wonders"}
              </p>
            </div>
            <div className='bg-[#2e9ca9] rounded-b-xl rounded-tr-xl p-4 text-white text-xl'>
              {generateQuestionFromMission(
                missionAnswers[currentSurveyIndex].missionId,
                missionAnswers[currentSurveyIndex].answer,
                missionAnswers[currentSurveyIndex].level
              )}
            </div>
            {/* <input
              checked={missionAnswers[currentSurveyIndex].hitUser}
              onChange={(e) => {
                setMissionAnswers(
                  missionAnswers.map((a) =>
                    a.id === missionAnswers[currentSurveyIndex].id
                      ? { ...a, hitUser: e.target.checked }
                      : a
                  )
                );
              }}
              type='checkbox'
              id={`mission-${currentSurveyIndex}`}
              className='mt-1 h-4 w-4 rounded border-gray-300 text-[#2e9ca9] focus:ring-[#2e9ca9]'
            /> */}
            {/* <label
              htmlFor={`mission-${currentSurveyIndex}`}
              className='text text-[#0d2c40] w-full'
            > */}

            {/* </label> */}
          </div>
        )}
      </div>

      <input
        type='text'
        className='bg-[#2e9ca9] rounded-b-xl rounded-tl-xl p-4 text-white text-xl'
        placeholder={"Insert snarky comment"}
      />
      <div className='flex justify-center gap-x-4'>
        {/* Previous and Next buttons */}
        <button
          onClick={() => setCurrentSurveyIndex(currentSurveyIndex - 1)}
          className='bg-[#2e9ca9] w-1/2 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          {"Yes"}
        </button>
        <button
          onClick={() => setCurrentSurveyIndex(currentSurveyIndex + 1)}
          className='bg-[#2e9ca9] w-1/2 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-[#25808a] transition-colors'
        >
          {"No"}
        </button>
      </div>
    </>
  );
}

function generateQuestionFromMission(
  missionId: number,
  answer: string,
  points: number
): string | null {
  const mission = descriptionTemplates.find(
    (mission) => mission.id === missionId
  );

  if (!mission) {
    return null;
  }

  return (
    mission?.verb.charAt(0).toUpperCase() +
    mission?.verb.slice(1) +
    " you " +
    mission?.prompt +
    " " +
    answer +
    "?"
  );
}
