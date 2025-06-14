export interface Target {
  name: string;
  type: "hit" | "avoid";
  vibe: string;
}

export interface Mission {
  id: number;
  title: string;
  missionString: string;
  description: string;
  prompt: string;
  hint: string;
  placeholder: string;
  targets: Target[];
}

// Mission templates that can be used to generate dynamic missions
const missionTemplates = [
  {
    title: "Common Ground",
    prompt: "What do you all have in common?",
    hint: "Think about shared experiences or interests...",
    placeholder: "A shared experience or interest",
    generateDescription: (
      players: Record<string, { name: string; vibe: string }>
    ) => {
      const playerNames = Object.values(players).map((p) => p.name);
      return `Find something that ${playerNames.join(", ")} all share`;
    },
  },
  {
    title: "Secret Talent",
    prompt: "What's your secret talent?",
    hint: "Something you're good at...",
    placeholder: "A skill or hobby",
    generateDescription: (
      players: Record<string, { name: string; vibe: string }>
    ) => {
      const playerNames = Object.values(players).map((p) => p.name);
      return `Share a talent that ${playerNames.join(
        ", "
      )} might not know about`;
    },
  },
  {
    title: "Future Plans",
    prompt: "Where do you see yourself in 5 years?",
    hint: "Think about your goals and aspirations...",
    placeholder: "Your future goals",
    generateDescription: (
      players: Record<string, { name: string; vibe: string }>
    ) => {
      return "Share your vision for the future";
    },
  },
  {
    title: "Favorite Memory",
    prompt: "What's your favorite memory from this year?",
    hint: "Think about a special moment or achievement...",
    placeholder: "A memorable experience",
    generateDescription: (
      players: Record<string, { name: string; vibe: string }>
    ) => {
      return "Share a special moment that made this year memorable";
    },
  },
  {
    title: "Dream Vacation",
    prompt: "If you could go anywhere in the world, where would it be?",
    hint: "Think about places you've always wanted to visit...",
    placeholder: "A dream destination",
    generateDescription: (
      players: Record<string, { name: string; vibe: string }>
    ) => {
      return "Share your dream travel destination";
    },
  },
];

enum TargetType {
  HIT = "hit",
  AVOID = "avoid",
}

const NUM_MISSIONS = 2;

export function generateMissions(
  players: Record<string, { name: string; vibe: string }>
): Mission[] {
  return Array(NUM_MISSIONS)
    .fill(0)
    .map((_, index) => {
      // Generate a random number between 1 and 2^n - 1 where n is the number of players
      const randomNumber =
        Math.floor(Math.random() * 2 ** (Object.keys(players).length - 1)) + 1;

      // Convert it to binary and array of 0s and 1s
      const binaryString = randomNumber.toString(2);
      const binaryArray = binaryString.split("").map(Number);
      // Pad the binary array with 0s to the left to make it the same length as the number of players
      const paddedBinaryArray = Array(
        Object.keys(players).length - binaryArray.length
      )
        .fill(0)
        .concat(binaryArray);

      const targets = Object.keys(players).map((player, index) => {
        return {
          name: player,
          type:
            paddedBinaryArray[index] === 1 ? TargetType.HIT : TargetType.AVOID,
          vibe: players[player].vibe,
        };
      });

      const missionString = `Hit ${joinWithAnd(
        targets
          .filter((target) => target.type === TargetType.HIT)
          .map((target) => target.name)
      )} while avoiding ${joinWithAnd(
        targets
          .filter((target) => target.type === TargetType.AVOID)
          .map((target) => target.name)
      )}`;

      return {
        id: index + 1,
        targets,
        missionString,
        title: missionTemplates[index].title,
        description: missionTemplates[index].generateDescription(players),
        prompt: missionTemplates[index].prompt,
        hint: missionTemplates[index].hint,
        placeholder: missionTemplates[index].placeholder,
      };
    });
}

function joinWithAnd(array: string[]) {
  return array.length > 1
    ? `${array.slice(0, -1).join(", ")} and ${array[array.length - 1]}`
    : array[0];
}
