
/* IMPORT */

import Puzzle from '../dist/index.js';

/* MAIN */

const main = async ( difficulty, iterations ) => {

  console.time ( 'generation' );

  for ( let i = 0; i < 1000000; i++ ) {

    await Puzzle.generate ( difficulty );

  }

  console.timeEnd ( 'generation' );

  const totalStart = Date.now ();

  let max = - Infinity;
  let min = Infinity;

  for ( let i = 0; i < iterations; i++ ) {

    const puzzle = await Puzzle.generate ( difficulty );

    const start = Date.now ();

    await Puzzle.solve ( puzzle.question );

    const elapsed = Date.now () - start;

    min = Math.min ( min, elapsed );
    max = Math.max ( max, elapsed );

  }

  const totalElapsed = Date.now () - totalStart;

  console.log ( 'Elapsed total:', totalElapsed );
  console.log ( 'Elapsed avg:', totalElapsed / iterations );
  console.log ( 'Elapsed max:', max );
  console.log ( 'Elapsed min:', min );

};

main ( 500000, 100 );
