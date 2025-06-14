export interface Target {
  name: string;
  type: "hit" | "avoid";
  vibe: string;
}

export interface DescriptionTemplate {
  prompt: string;
  level1: string;
  level2: string;
}

export interface Mission {
  id: number;
  targets: Target[];
  missionString: string;
  descriptionTemplate: DescriptionTemplate;
}

const descriptionTemplates: DescriptionTemplate[] = [
  {
    prompt: "has/have learned this",
    level1: "a language besides English",
    level2: "musical instrument",
  },
  {
    prompt: "has/have done this",
    level1: "a sport",
    level2: "a water sport",
  },
  {
    prompt: "has/have been to",
    level1: "a city",
    level2: "a concert",
  },
  {
    prompt: "has/have had this",
    level1: "lost item",
    level2: "faux pas",
  },
  {
    prompt: "has/have ever had a date",
    level1: "with an attribute of a person",
    level2: "in a place",
  },
  {
    prompt: "would pay 1000 dollars for",
    level1: "valuable item",
    level2: "a desire",
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
  // Generate NUM_MISSIONS random numbers between 1 and 2^n - 1 where n is the number of players, and make sure they are different
  const numbersFrom1To2PowerNMinus1 = Array(
    2 ** Object.keys(players).length - 2
  )
    .fill(0)
    .map((_, index) => index + 1);

  const fisherYatesShuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledNumbers = fisherYatesShuffle(numbersFrom1To2PowerNMinus1);
  const shuffledDescriptionTemplates = fisherYatesShuffle(descriptionTemplates);

  return Array(NUM_MISSIONS)
    .fill(0)
    .map((_, index) => {
      // Generate a random number between 1 and 2^n - 1 where n is the number of players
      const randomNumber = shuffledNumbers[index];

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
        descriptionTemplate: shuffledDescriptionTemplates[index],
      };
    });
}

export function joinWithAnd(array: string[]) {
  return array.length > 1
    ? `${array.slice(0, -1).join(", ")} and ${array[array.length - 1]}`
    : array[0];
}
