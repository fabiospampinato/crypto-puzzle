
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
type ParamsOptions = {
  primeBits?: number,
  primeRounds?: number
};

type Params = {
  n: bigint,
  n1: bigint
};
/* EXPORT */

export type {Archive, Options, ParamsOptions, Params};
