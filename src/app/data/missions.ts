export interface Target {
  name: string;
  type: "hit" | "avoid";
  vibe: string;
}

export interface DescriptionTemplate {
  id: number;
  verb: string;
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
    id: 1,
    verb: "have",
    prompt: "learned",
    level1: "a language",
    level2: "musical instrument",
  },
  {
    id: 2,
    verb: "have",
    prompt: "done",
    level1: "a sport",
    level2: "a water sport",
  },
  {
    id: 3,
    verb: "have",
    prompt: "been to",
    level1: "a city",
    level2: "a concert",
  },
  {
    id: 4,
    verb: "have",
    prompt: "had",
    level1: "pet",
    level2: "lost item",
  },
  {
    id: 5,
    verb: "have",
    prompt: "ever had a date with/in",
    level1: "an attribute of a person",
    level2: "a place",
  },
  {
    id: 6,
    verb: "would",
    prompt: "pay 1000 dollars for",
    level1: "valuable item",
    level2: "a desire",
  },
  {
    id: 7,
    verb: "have",
    prompt: "had a beef with",
    level1: "an attribute of a person",
    level2: "a name of a person",
  },
  {
    id: 8,
    verb: "have",
    prompt: "heard or watched",
    level1: "a song",
    level2: "a YouTube video",
  },
  {
    id: 9,
    verb: "would",
    prompt: "spend an entire day on",
    level1: "a hobby",
    level2: "a book",
  },
  {
    id: 10,
    verb: "would",
    prompt: "read",
    level1: "any piece of reading material",
    level2: "a book",
  },
  {
    id: 11,
    verb: "have",
    prompt: "finished",
    level1: "a book",
    level2: "a TV show",
  },
  {
    id: 12,
    verb: "would",
    prompt: "go often to",
    level1: "a local destination",
    level2: "a foreign destination",
  },
  {
    id: 13,
    verb: "would",
    prompt: "eat",
    level1: "a type of food",
    level2: "a restaurant",
  },
  {
    id: 14,
    verb: "would",
    prompt: "pet/touch",
    level1: "a type of animal",
    level2: "a type of object",
  },
  {
    id: 15,
    verb: "would",
    prompt: "be close friends with",
    level1: "an attribute of a person",
    level2: "a known person",
  },
  {
    id: 16,
    verb: "would",
    prompt: "have complaints about",
    level1: "a situation",
    level2: "an attribute of a person",
  },
  {
    id: 17,
    verb: "have",
    prompt: "had a crush on",
    level1: "an attribute of a person",
    level2: "a known person",
  },
  {
    id: 18,
    verb: "have",
    prompt: "complained about",
    level1: "an situation",
    level2: "an attribute of a person",
  },
  {
    id: 19,
    verb: "would",
    prompt: "likely have received complaints about",
    level1: "a situation",
    level2: "a personality trait",
  },
  {
    id: 20,
    verb: "would",
    prompt: "scored high on",
    level1: "a peronality trait",
    level2: "a test",
  },
  {
    id: 21,
    verb: "would",
    prompt: "dare to",
    level1: "an extreme activity",
    level2: "a situation",
  },
  {
    id: 22,
    verb: "would",
    prompt: "have a crush on",
    level1: "an attribute of a person",
    level2: "a known person",
  },
  {
    id: 23,
    verb: "have",
    prompt: "been a/an",
    level1: "this personality trait",
    level2: "position of power",
  },
  {
    id: 24,
    verb: "would",
    prompt: "seriously consider",
    level1: "a major in college",
    level2: "life event",
  },
  {
    id: 25,
    verb: "have",
    prompt: "been known for",
    level1: "a personality trait",
    level2: "a situation",
  },
  {
    id: 26,
    verb: "would",
    prompt: "watch",
    level1: "a movie",
    level2: "a TV show",
  },
  {
    id: 27,
    verb: "have",
    prompt: "watched at least some of",
    level1: "a movie",
    level2: "a TV show",
  },
  {
    id: 28,
    verb: "have",
    prompt: "worked on",
    level1: "a situation",
    level2: "a job",
  },
  {
    id: 29,
    verb: "would",
    prompt: "work on",
    level1: "a situation",
    level2: "a job",
  },
  {
    id: 30,
    verb: "have",
    prompt: "cried during",
    level1: "a movie",
    level2: "a life event",
  },
  {
    id: 31,
    verb: "would",
    prompt: "geek out about",
    level1: "a niche interest",
    level2: "a pop culture topic",
  },
  {
    id: 32,
    verb: "have",
    prompt: "won",
    level1: "a small competition",
    level2: "a major award",
  },
  {
    id: 33,
    verb: "would",
    prompt: "rant endlessly about",
    level1: "a daily annoyance",
    level2: "a societal issue",
  },
  {
    id: 34,
    verb: "have",
    prompt: "spent too much time on",
    level1: "a mobile app",
    level2: "a random hobby",
  },
  {
    id: 35,
    verb: "would",
    prompt: "trade lives with",
    level1: "a celebrity",
    level2: "a fictional character",
  },
  {
    id: 36,
    verb: "have",
    prompt: "binge-watched",
    level1: "a show",
    level2: "a YouTube channel",
  },
  {
    id: 37,
    verb: "would",
    prompt: "write a book about",
    level1: "a life lesson",
    level2: "a fantasy world",
  },
  {
    id: 38,
    verb: "have",
    prompt: "dreamt of",
    level1: "a career",
    level2: "an imaginary place",
  },
  {
    id: 39,
    verb: "would",
    prompt: "host a podcast on",
    level1: "a skill",
    level2: "an opinion or philosophy",
  },
  {
    id: 40,
    verb: "have",
    prompt: "built",
    level1: "a DIY project",
    level2: "a software app",
  },
  {
    id: 41,
    verb: "would",
    prompt: "win a game of",
    level1: "a board game",
    level2: "a social game",
  },
  {
    id: 42,
    verb: "have",
    prompt: "made a fool of themselves during",
    level1: "a presentation",
    level2: "a party",
  },
  {
    id: 43,
    verb: "would",
    prompt: "love to be stuck in",
    level1: "a time period",
    level2: "a fantasy world",
  },
  {
    id: 44,
    verb: "have",
    prompt: "practiced",
    level1: "a language",
    level2: "a martial art",
  },
  {
    id: 45,
    verb: "would",
    prompt: "get into a heated debate over",
    level1: "a food preference",
    level2: "a moral issue",
  },
  {
    id: 46,
    verb: "would",
    prompt: "fall asleep during",
    level1: "a class",
    level2: "a movie",
  },
  {
    id: 47,
    verb: "would",
    prompt: "travel back in time for",
    level1: "a historical event",
    level2: "a personal memory",
  },
  {
    id: 48,
    verb: "have",
    prompt: "been complimented on",
    level1: "a personality trait",
    level2: "a physical feature",
  },
  {
    id: 49,
    verb: "would",
    prompt: "ask for advice from",
    level1: "a character",
    level2: "a known person",
  },
  {
    id: 50,
    verb: "would",
    prompt: "teleport to",
    level1: "a place",
    level2: "a reason",
  },
  {
    id: 51,
    verb: "would",
    prompt: "choose to have",
    level1: "a superpower",
    level2: "a responsibility",
  },
];

function singularizeVerb(verb: string) {
  if (verb === "have") {
    return "has";
  } else if (verb === "would") {
    return "would";
  }
  return verb;
}

export function useVerbBasedOnPlayerCount(verb: string, playerCount: number) {
  if (playerCount >= 2) {
    return verb;
  }
  return singularizeVerb(verb);
}

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
