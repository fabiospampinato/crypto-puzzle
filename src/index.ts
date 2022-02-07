
/* IMPORT */

import XXH from 'crypto-xxhash-64';
import getBigInt from 'crypto-random-bigint';
import getInRange from 'crypto-random-in-range';
import {Question, Solution, Puzzle} from './types';

/* MAIN */

const Puzzle = {

  /* API */

  generate: async ( difficulty: number | bigint ): Promise<Puzzle> => {

    difficulty = BigInt ( difficulty );

    if ( difficulty <= 0n ) throw new Error ( 'The difficulty must be positive' );

    await XXH.loadWASM ();

    const salt = getBigInt ( 64 ).toString ( 16 );
    const solution = getInRange ( 0, difficulty );
    const key = `${salt}${solution.toString ( 16 )}`;
    const hash = XXH.hash ( key );
    const question = { difficulty, salt, hash };
    const puzzle = { question, solution };

    return puzzle;

  },

  solve: async ( question: Question ): Promise<Solution> => {

    await XXH.loadWASM ();

    for ( let i = 0n, l = question.difficulty; i < l; i++ ) {

      const key = `${question.salt}${i.toString ( 16 )}`;
      const hash = XXH.hash ( key );

      if ( hash !== question.hash ) continue;

      return i;

    }

    throw new Error ( 'The puzzle could not be solved' );

  }

};

/* EXPORT */

export default Puzzle;
