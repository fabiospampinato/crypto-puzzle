
/* MAIN */

type Archive = [
  n: bigint,
  a: bigint,
  t: bigint,
  Ck: bigint,
  Cm: Uint8Array
];

type Options = {
  /* ADVANCED */
  primeBits?: number,
  primeRounds?: number,
  opsPerSecond?: number,
  /* MAIN */
  duration: number,
  message: string
};

/* EXPORT */

export type {Archive, Options};
