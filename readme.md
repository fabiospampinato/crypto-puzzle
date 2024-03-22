# Crypto Puzzle

A [time-lock puzzle](https://people.csail.mit.edu/rivest/pubs/RSW96.pdf) generator.

## Description

Time-lock puzzles are kind of a way to craft a message that can only be read after some point in the future, which you can pick.

A time-lock puzzle is a computational puzzle that requires a deterministic number of operations to solve. By calculating how many operations per second an attacker, or the receiver of your message, could perform you can configure the amount of operations needed to decrypt the message such that at least the amount of time that you require must have passed for the message to have been decrypted.

This works because the operations that need to be performed to solve a puzzle are not parallelizable, you can't solve time-lock puzzles meaningfully faster with a GPU or a million computers, and generating the puzzle is always cheap, because you know which prime numbers it's secured by, basically.

Time-lock puzzles are basically little proof-of-works, they have lots of interesting applications, for example a solution like this can be used to fight spam, by requiring that each request that your server receives comes with its own solution to a unique time-lock puzzle, which would be cheap for you to generate, cheap for you to check, cheap for legitimate users to solve, but prohibitively expensive for abusers/spammers to solve many of. It can be used as a sort of transparent captcha that can't be bypassed.

## Install

```sh
npm install --save crypto-puzzle
```

## Usage

```ts
import Puzzle from 'crypto-puzzle';

// Generate a puzzle that can only be read in about 10 seconds from now

const puzzle = await Puzzle.generate ({
  /* OPTIONAL OPTIONS */
  primeBits: 100, // Number of bits of entropy that the two internally generated primes will have
  primeRounds: 6, // Number of Miller-Rabin primality checks that the prime numbers will have to pass
  opsPerSecond: 3_300_000, // Rough number of operations per second that the attacker/receiver can perform, 3.3M is around what a MBP M1 Max can do
  /* REQUIRED OPTIONS */
  duration: 10_000, // Rough minimum number of milliseconds that this puzzle will be unsolvable for
  message: 'Hey there!' // Message to encrypt inside the puzzle
});

// Now let's solve the puzzle

const solution = await Puzzle.solve ( puzzle );

// About 10 seconds later...

console.log ( solution ); // => 'Hey there!'
```

## License

MIT © Fabio Spampinato
