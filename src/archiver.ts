
/* IMPORT */

import BigEnc from 'bigint-encoding';
import Int32 from 'int32-encoding';
import concat from 'uint8-concat';
import type {Archive} from './types';

/* MAIN */

const Archiver = {

  /* API */

  archive: ( archive: Archive ): Uint8Array => {

    const [n, a, t, Ck, Cm] = archive;

    const n_uint8 = BigEnc.decode ( n );
    const n_length = Int32.encode ( n_uint8.length );

    const a_uint8 = BigEnc.decode ( a );
    const a_length = Int32.encode ( a_uint8.length );

    const t_uint8 = BigEnc.decode ( t );
    const t_length = Int32.encode ( t_uint8.length );

    const Ck_uint8 = BigEnc.decode ( Ck );
    const Ck_length = Int32.encode ( Ck_uint8.length );

    return concat ([ n_length, n_uint8, a_length, a_uint8, t_length, t_uint8, Ck_length, Ck_uint8, Cm ]);

  },

  unarchive: ( archive: Uint8Array ): Archive => {

    const n_length_offset = 0;
    const n_length_uint8 = archive.slice ( n_length_offset, n_length_offset + 4 );
    const n_length = Int32.decode ( n_length_uint8 );
    const n_offset = n_length_offset + 4;
    const n_uint8 = archive.slice ( n_offset, n_offset + n_length );
    const n = BigEnc.encode ( n_uint8 );

    const a_length_offset = n_offset + n_length;
    const a_length_uint8 = archive.slice ( a_length_offset, a_length_offset + 4 );
    const a_length = Int32.decode ( a_length_uint8 );
    const a_offset = a_length_offset + 4;
    const a_uint8 = archive.slice ( a_offset, a_offset + a_length );
    const a = BigEnc.encode ( a_uint8 );

    const t_length_offset = a_offset + a_length;
    const t_length_uint8 = archive.slice ( t_length_offset, t_length_offset + 4 );
    const t_length = Int32.decode ( t_length_uint8 );
    const t_offset = t_length_offset + 4;
    const t_uint8 = archive.slice ( t_offset, t_offset + t_length );
    const t = BigEnc.encode ( t_uint8 );

    const Ck_length_offset = t_offset + t_length;
    const Ck_length_uint8 = archive.slice ( Ck_length_offset, Ck_length_offset + 4 );
    const Ck_length = Int32.decode ( Ck_length_uint8 );
    const Ck_offset = Ck_length_offset + 4;
    const Ck_uint8 = archive.slice ( Ck_offset, Ck_offset + Ck_length );
    const Ck = BigEnc.encode ( Ck_uint8 );

    const Cm_offset = Ck_offset + Ck_length;
    const Cm = archive.slice ( Cm_offset );

    return [n, a, t, Ck, Cm];

  }

};

/* EXPORT */

export default Archiver;
