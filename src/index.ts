
/* IMPORT */

import getBigInt from 'crypto-random-bigint';
import getInRange from 'crypto-random-in-range';
import {sha512} from 'crypto-sha';
import {makeTimeoutYielder} from 'event-loop-yielder';
import type {Question, Solution, Puzzle} from './types';

/* MAIN */

const Puzzle = {

  /* API */

  generate: async ( difficulty: number | bigint ): Promise<Puzzle> => {

    difficulty = BigInt ( difficulty );

    if ( difficulty <= 0n ) throw new Error ( 'The difficulty must be positive' );

    const salt = getBigInt ( 64 ).toString ( 16 );
    const solution = getInRange ( 0, difficulty );
    const key = `${salt}${solution.toString ( 16 )}`;
    const hash = await sha512 ( key );
    const question = { difficulty, salt, hash };
    const puzzle = { question, solution };

    return puzzle;

  },

  solve: async ( question: Question ): Promise<Solution> => {

    const yielder = makeTimeoutYielder ( 8 );

    for ( let i = 0, si = 0n, sl = question.difficulty; si < sl; i++, si++ ) {

      if ( i % 200 === 0 ) await yielder ();

      const key = `${question.salt}${si.toString ( 16 )}`;
      const hash = await sha512 ( key );

      if ( hash !== question.hash ) continue;

      return si;

    }

    throw new Error ( 'The puzzle could not be solved' );

  }

};

/* EXPORT */

export default Puzzle;
