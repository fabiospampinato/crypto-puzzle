# Crypto Puzzle

Basically a proof-of-work generator, this library makes cryptographic puzzles that are arbitrarily expensive to solve.

## Install

```sh
npm install --save crypto-puzzle
```

## How It Works

Puzzles are generated this way:

1. A random salt is generated.
2. A random integer is picked between `0` and `difficulty`, that's going to be the solution of the puzzle.
3. The salt and integer are joined together to form the key.
4. The key is hashed.
5. The solver receives the `difficulty`, the salt and the hash and it's asked to find the solution.

Puzzles are solved this way:

1. For all integers between `0` and `difficulty` the following actions are performed.
2. The current integer, which is the potential solution, is joined with the salt to form the key.
3. The key is hashed.
4. If the key doesn't match the correct one the next integer is tried.
5. If the key matches the correct one the integer is the solution and the puzzle is solved.

Details:

- The time necessary to generate puzzles is constant, it doesn't matter what the `difficulty` is.
- The average time necessary to solve puzzles grows linearly with the `difficulty`.
- There are no shortcuts, unlike captchas and other stuff the user here _must_ do the work to solve each puzzle.

## Usage

```ts
import Puzzle from 'crypto-puzzle';

const difficulty = 100000;
const puzzle = await Puzzle.generate ( difficulty );
const solution = await Puzzle.solve ( puzzle.question );

console.assert ( puzzle.solution === solution );
```

## License

MIT © Fabio Spampinato
