
/* IMPORT */

import getHexadecimal from 'crypto-random-hexadecimal';
import getInRange from 'crypto-random-in-range';
import {sha512} from 'crypto-sha';
import {Question, Solution, Puzzle} from './types';

/* MAIN */

const Puzzle = {

  /* API */

  generate: async ( difficulty: number | bigint ): Promise<Puzzle> => {

    difficulty = BigInt ( difficulty );

    if ( difficulty <= 0n ) throw new Error ( 'The difficulty must be positive' );

    const salt = getHexadecimal ( 64 );
    const solution = getInRange ( 0, difficulty );
    const key = `${salt}${solution}`;
    const hash = await sha512 ( key );
    const question = { difficulty, salt, hash };
    const puzzle = { question, solution };

    return puzzle;

  },

  solve: async ( question: Question ): Promise<Solution> => {

    for ( let i = 0n, l = question.difficulty; i < l; i++ ) {

      const key = `${question.salt}${i}`;
      const hash = await sha512 ( key );

      if ( hash !== question.hash ) continue;

      return i;

    }

    throw new Error ( 'The puzzle could not be solved' );

  }

};

/* EXPORT */

export default Puzzle;
