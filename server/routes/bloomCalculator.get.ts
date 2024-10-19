const docs = JSON.stringify({
  name: 'bloomCalculator',
  description:
    'Calculates the optimal bit array size and the number of hashing functions for the bloom filter. The calculation is adapted from https://hur.st/bloomfilter.',
  input: {
    type: 'object',
    description: 'Input data',
    properties: {
      n: {
        type: 'integer',
        description: 'Number of items to be stored in the filter',
        example: 1000,
      },
      p: {
        type: 'number',
        description:
          'False positive rate, between 0 (exclusive) and 1 (inclusive)',
        example: 0.0001,
      },
    },
    required: ['n', 'p'],
    example: { n: 1000, p: 0.0001 },
  },
  output: {
    type: 'array',
    description: 'Calculation result',
    prefixItems: [
      {
        type: 'integer',
        description: 'Size of bit array',
        example: 19171,
      },
      {
        type: 'integer',
        description: 'Number of hashing functions',
        example: 13,
      },
    ],
    items: false,
    minItems: 2,
    example: [19171, 13],
  },
});

export default defineEventHandler(() => docs);
