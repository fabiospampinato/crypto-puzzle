
/* MAIN */

const sfme = ( a: bigint, t: bigint, n: bigint ): bigint => { //TODO: Maybe add a special-cased for this in (power of two exponents) `fast-mod-exp`, somehow

  let x = a % n;

  if ( t <= BigInt ( Number.MAX_SAFE_INTEGER ) ) {

    for ( let i = Number ( t ); i > 0; i-- ) {

      x = ( x * x ) % n;

    }

  } else {

    for ( let i = t; i > 0n; i-- ) {

      x = ( x * x ) % n;

    }

  }

  return x % n;

};

/* EXPORT */

export {sfme};
