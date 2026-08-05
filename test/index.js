
/* IMPORT */

import {describe} from 'fava';
import Puzzle from '../dist/index.js';

/* MAIN */

describe ( 'Crypto Puzzle', it => {

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
  it ( 'can generate multiple puzzles from shared params', async t => {

  const params = Puzzle.generateParams ({ primeBits: 100, primeRounds: 20 });

  const puzzle1 = await Puzzle.generate ({ duration: 500, message: 'msg1' }, params );
  const puzzle2 = await Puzzle.generate ({ duration: 500, message: 'msg2' }, params );

  const solution1 = await Puzzle.solve ( puzzle1 );
  const solution2 = await Puzzle.solve ( puzzle2 );

  t.is ( 'msg1', solution1 );
  t.is ( 'msg2', solution2 );

});

});

