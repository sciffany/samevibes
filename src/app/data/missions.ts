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

export const descriptionTemplates: DescriptionTemplate[] = [
  {
    id: 1,
    verb: "have",
    prompt: "learned",
    level1: "a skill",
    level2: "a subject",
  },
  {
    id: 2,
    verb: "have",
    prompt: "attended",
    level1: "a type of event",
    level2: "a class",
  },
  {
    id: 3,
    verb: "have",
    prompt: "been to",
    level1: "a location",
    level2: "a type of place",
  },
  {
    id: 4,
    verb: "have",
    prompt: "lost",
    level1: "a concrete item",
    level2: "an abstract item",
  },
  {
    id: 5,
    verb: "have",
    prompt: "ever had a date with",
    level1: "an description of a person",
    level2: "a type of person",
  },
  {
    id: 6,
    verb: "would",
    prompt: "pay a lot of money for",
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
    prompt: "heard",
    level1: "a sound",
    level2: "a music",
  },
  {
    id: 9,
    verb: "would",
    prompt: "spend an entire day on",
    level1: "a hobby",
    level2: "an activity",
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
    prompt: "watched",
    level1: "a scene/video",
    level2: "a movie/TV show",
  },
  {
    id: 12,
    verb: "would",
    prompt: "often go to",
    level1: "a destination",
    level2: "an activity",
  },
  {
    id: 13,
    verb: "would",
    prompt: "eat or drink",
    level1: "an attribute of a food",
    level2: "in specific a manner",
  },
  {
    id: 14,
    verb: "have",
    prompt: "eaten or drunk",
    level1: "an attribute of a food",
    level2: "in specific a manner",
  },
  {
    id: 15,
    verb: "have",
    prompt: "a family member that's",
    level1: "a type of person",
    level2: "a type of relationship",
  },
  {
    id: 16,
    verb: "can",
    prompt: "speak",
    level1: "a language",
    level2: "a way of speaking",
  },
  {
    id: 17,
    verb: "would",
    prompt: "be annoyed by",
    level1: "a situation",
    level2: "a behavior",
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
    prompt: "score high on",
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
    level1: "an attribute of a person",
    level2: "a type of person",
  },
  {
    id: 24,
    verb: "would",
    prompt: "seriously consider",
    level1: "a life decision",
    level2: "a life event",
  },
  {
    id: 25,
    verb: "have",
    prompt: "been known for",
    level1: "a personality trait",
    level2: "a type of person",
  },
  {
    id: 26,
    verb: "would",
    prompt: "watch",
    level1: "a scene/video",
    level2: "a movie/TV show",
  },
  {
    id: 27,
    verb: "have",
    prompt: "tried",
    level1: "an activity",
    level2: "a daring thing",
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
    prompt: "cried when",
    level1: "a situation",
    level2: "an event",
  },
  {
    id: 31,
    verb: "would",
    prompt: "talk a lot about",
    level1: "an interest",
    level2: "a topic",
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
    prompt: "rant about",
    level1: "an annoyance",
    level2: "an issue",
  },
  {
    id: 34,
    verb: "have",
    prompt: "spent too much time on",
    level1: "a hobby",
    level2: "an activity",
  },
  {
    id: 35,
    verb: "would",
    prompt: "trade lives with",
    level1: "a type of person",
    level2: "a known person",
  },
  {
    id: 36,
    verb: "have",
    prompt: "binge-watched",
    level1: "a TV show",
    level2: "a channel",
  },
  {
    id: 37,
    verb: "would",
    prompt: "write an article about",
    level1: "a topic",
    level2: "a general area",
  },
  {
    id: 38,
    verb: "have",
    prompt: "dreamt of",
    level1: "a nighttime dream",
    level2: "a desire",
  },
  {
    id: 39,
    verb: "can",
    prompt: "play",
    level1: "a musical instrument",
    level2: "a sport",
  },
  {
    id: 40,
    verb: "have",
    prompt: "created",
    level1: "a DIY project",
    level2: "a product",
  },
  {
    id: 41,
    verb: "would",
    prompt: "win a game of",
    level1: "a board game",
    level2: "a sport",
  },
  {
    id: 42,
    verb: "would",
    prompt: "like to play",
    level1: "a game",
    level2: "a genre",
  },
  {
    id: 43,
    verb: "would",
    prompt: "love to be stuck in",
    level1: "a fantasy world",
    level2: "a time period",
  },
  {
    id: 44,
    verb: "have",
    prompt: "practiced",
    level1: "a random skill",
    level2: "a life skill",
  },
  {
    id: 45,
    verb: "would",
    prompt: "prefer",
    level1: "a preference",
    level2: "an opinion",
  },
  {
    id: 46,
    verb: "would",
    prompt: "fall asleep during",
    level1: "a situation",
    level2: "an class/movie",
  },
  {
    id: 47,
    verb: "would",
    prompt: "time travel to",
    level1: "a time period",
    level2: "for a reason",
  },
  {
    id: 48,
    verb: "have",
    prompt: "been complimented for",
    level1: "a trait",
    level2: "a behavior",
  },
  {
    id: 49,
    verb: "would",
    prompt: "ask for advice from",
    level1: "a type of person",
    level2: "a character/person",
  },
  {
    id: 50,
    verb: "would",
    prompt: "teleport to",
    level1: "a place",
    level2: "for this reason",
  },
  {
    id: 51,
    verb: "would",
    prompt: "want to have",
    level1: "a power/ability",
    level2: "a wish",
  },

  {
    id: 52,
    verb: "have",
    prompt: "had an encounter/experience with",
    level1: "a life experience",
    level2: "a life event",
  },
  {
    id: 53,
    verb: "would",
    prompt: "decorate their room with",
    level1: "a theme",
    level2: "a scheme",
  },
  {
    id: 54,
    verb: "have",
    prompt: "memorized",
    level1: "some facts",
    level2: "a memorizable thing",
  },
  {
    id: 55,
    verb: "would",
    prompt: "teach a class on",
    level1: "a specific topic",
    level2: "a skill",
  },
  {
    id: 56,
    verb: "have",
    prompt: "quit",
    level1: "a habit",
    level2: "a hobby",
  },
  {
    id: 57,
    verb: "would",
    prompt: "judge someone for",
    level1: "a habit",
    level2: "an activity",
  },
  {
    id: 58,
    verb: "would",
    prompt: "wear",
    level1: "an accessory",
    level2: "a piece of clothing",
  },
  {
    id: 59,
    verb: "would",
    prompt: "start a business in",
    level1: "a hobby",
    level2: "an industry",
  },
  {
    id: 60,
    verb: "have",
    prompt: "used a/an",
    level1: "an item",
    level2: "a skill",
  },
  {
    id: 61,
    verb: "can",
    prompt: "do",
    level1: "a skill",
    level2: "a task",
  },
  {
    id: 62,
    verb: "can",
    prompt: "imitate",
    level1: "a known person/character",
    level2: "an attribute of a person",
  },
  {
    id: 63,
    verb: "would",
    prompt: "hire a personal coach for",
    level1: "a skill",
    level2: "a habit",
  },
  {
    id: 64,
    verb: "have",
    prompt: "felt angry about",
    level1: "a social behavior",
    level2: "a situation",
  },
  {
    id: 65,
    verb: "would",
    prompt: "get distracted by",
    level1: "a person",
    level2: "a random object",
  },
  {
    id: 66,
    verb: "have",
    prompt: "liked",
    level1: "a person",
    level2: "an object",
  },
  {
    id: 67,
    verb: "would",
    prompt: "stop using phone for",
    level1: "a reason",
    level2: "a challenge",
  },
  {
    id: 68,
    verb: "have",
    prompt: "searched about",
    level1: "a topic",
    level2: "an interest",
  },
  {
    id: 69,
    verb: "would",
    prompt: "quit their job to pursue",
    level1: "a dream",
    level2: "an activity",
  },
  {
    id: 70,
    verb: "have",
    prompt: "revealed",
    level1: "a fact",
    level2: "a secret",
  },
  {
    id: 71,
    verb: "have",
    prompt: "been a victim of",
    level1: "a disaster",
    level2: "a situation",
  },
  {
    id: 72,
    verb: "would",
    prompt: "be scared of",
    level1: "an activity",
    level2: "a situation",
  },
  {
    id: 73,
    verb: "would",
    prompt: "travel with",
    level1: "an item",
    level2: "a person",
  },
  {
    id: 74,
    verb: "would",
    prompt: "be willing to",
    level1: "a specific activity",
    level2: "a situation",
  },
  {
    id: 75,
    verb: "would",
    prompt: "listen to",
    level1: "a specific genre",
    level2: "a specific artist",
  },
];

function singularizeVerb(verb: string) {
  if (verb === "have") {
    return "has";
  } else if (verb === "would") {
    return "would";
  } else if (verb === "can") {
    return "can";
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

const NUM_MISSIONS = 5;

export const fisherYatesShuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function generateMissions(
  players: Record<string, { name: string; vibe: string }>
): Mission[] {
  const shuffledDescriptionTemplates = fisherYatesShuffle(descriptionTemplates);

  return Array(NUM_MISSIONS)
    .fill(0)
    .map((_, index) => {
      // // Generate a random number between 1 and 2^n - 1 where n is the number of players
      // const randomNumber =
      //   Math.floor(Math.random() * (2 ** Object.keys(players).length - 1)) + 1;

      // // Convert it to binary and array of 0s and 1s
      // const binaryString = randomNumber.toString(2);

      // const binaryArray = binaryString.split("").map(Number);

      // // Pad the binary array with 0s to the left to make it the same length as the number of players
      // const paddedBinaryArray = Array(
      //   Object.keys(players).length - binaryArray.length
      // )
      //   .fill(0)
      //   .concat(binaryArray);

      const targets = Object.keys(players).map((player, index) => {
        return {
          name: player,
          type: Math.random() > 0.5 ? TargetType.HIT : TargetType.AVOID,
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
        id: shuffledDescriptionTemplates[index].id,
        targets,
        missionString,
        descriptionTemplate: shuffledDescriptionTemplates[index],
      };
    });
}

export function joinWithAnd(array: string[]) {
  if (array.length === 0) {
    return "NOBODY";
  }

  return array.length > 1
    ? `${array.slice(0, -1).join(", ")} and ${array[array.length - 1]}`
    : array[0];
}
