
/* IMPORT */

import {describe} from 'fava';
import Puzzle from '../dist/index.js';

/* MAIN */

describe ( 'Cryto Puzzle', it => {

  it ( 'can generate and solve puzzles in about the specified amount of time', async t => {

    for ( const duration of [100, 1000, 2000, 3000, 4000] ) {

      const start = Date.now ();

      const message = String ( duration );
      const puzzle = await Puzzle.generate ({ duration, message });
      const solution = await Puzzle.solve ( puzzle );

      const end = Date.now ();
      const elapsed = end - start;

      t.is ( message, solution );
      t.true ( elapsed >= duration * 0.9 && elapsed <= duration * 1.1 );

    }

  });

});
