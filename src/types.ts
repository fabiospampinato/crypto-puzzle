
/* MAIN */

type Question = {
  difficulty: bigint,
  salt: string,
  hash: string
};

type Solution = bigint;

type Puzzle = {
  question: Question,
  solution: Solution
};

/* EXPORT */

export {Question, Solution, Puzzle};
