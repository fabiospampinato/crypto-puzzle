
/* IMPORT */

import {describe} from 'fava';
import Puzzle from '../dist/index.js';

/* MAIN */

describe ( 'Cryto Puzzle', it => {

  it ( 'can generate puzzles that it can solve', async t => {

    for ( let i = 0, l = 1000; i < l; i++ ) {

      const puzzle = await Puzzle.generate ( 1000 );
      const solution = await Puzzle.solve ( puzzle.question );

      t.is ( puzzle.solution, solution );

    }

  });

});
