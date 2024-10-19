# func(live)

This repository contains the code submitted to [func.live](func.live) as part of the coding challenge from [Wakeflow](https://github.com/wakeflow/how-we-do/blob/master/docs/interview.md#2-quick-coding-challenge).

## Functions

### `bloomCalculator`

Calculates the optimal bit array size and the number of hashing functions for the [bloom filter](https://en.wikipedia.org/wiki/Bloom_filter).

The calculation is adapted from https://hur.st/bloomfilter.

Input:
- `n`: Number of items to be stored in the filter
- `p`: False positive rate, between 0 (exclusive) and 1 (inclusive)

Output:
- `[m, k]`, where:
- `m`: Size of bit array
- `k`: Number of hashing functions

## Install

1. Install [Node.js v20](https://nodejs.org/en/download/package-manager)
2. Install [pnpm](https://pnpm.io/installation)
3. Clone the repository
4. Run `pnpm i`

## Testing
Run `pnpm test`
