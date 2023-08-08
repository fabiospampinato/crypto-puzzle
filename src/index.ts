
/* IMPORT */

import fme from 'fast-mod-exp';
import Encryptor from 'tiny-encryptor';
import getPrime from 'crypto-random-prime';
import getInRange from 'crypto-random-in-range';
import getRandomBytes from 'crypto-random-uint8';
import {sha256} from 'crypto-sha';
import U8 from 'uint8-encoding';
import BigEnc from 'bigint-encoding';
import Archiver from './archiver';
import {sfme} from './utils';
import type {Options} from './types';

/* MAIN */

//URL: https://people.csail.mit.edu/rivest/pubs/RSW96.pdf

const CryptoPuzzle = {

  /* API */

  generate: async ( options: Options ): Promise<Uint8Array> => {

    const PRIME_BITS = options.primeBits ?? 100;
    const PRIME_ROUNDS = options.primeRounds ?? 6;
    const OPS_PER_SECOND = options.opsPerSecond ?? 3_000_000;
    const DURATION = options.duration ?? 1_000;
    const MESSAGE = options.message;

    const p = getPrime ( PRIME_BITS, PRIME_ROUNDS );
    const q = getPrime ( PRIME_BITS, PRIME_ROUNDS );

    const n = p * q;
    const n1 = ( p - 1n ) * ( q - 1n );

    const S = OPS_PER_SECOND;
    const T = DURATION;
    const t = BigInt ( Math.round ( Math.max ( 1, ( S / 1000 ) ) * T ) );

    const K = await sha256.uint8 ( getRandomBytes ( 32 ) );
    const M = MESSAGE;
    const Cm = await Encryptor.encrypt ( M, K );

    const a = getInRange ( 1n, n - 1n );
    const e = fme ( 2n, t, n1 );
    const b = fme ( a, e, n );
    const Ck = BigEnc.encode ( K ) + b;

    const archive = Archiver.archive ([ n, a, t, Ck, Cm ]);

    return archive;

  },

  solve: async ( puzzle: Uint8Array ): Promise<string> => {

    const [n, a, t, Ck, Cm] = Archiver.unarchive ( puzzle );

    const b = sfme ( a, t, n );
    const K = BigEnc.decode ( Ck - b );
    const M_uint8 = await Encryptor.decrypt ( Cm, K );
    const M = U8.decode ( M_uint8 );

    return M;

  }

};

/* EXPORT */

export default CryptoPuzzle;
