const { gs, createGeneration } = require('../dist/generation-game.cjs');

const shops = ['halfords', 'tescos', 'waitrose', 'b&q'];
const feeling = ['wonderful', 'great', 'poor', 'disapointing'];
const activity = ['sleeping', 'bored', 'texting'];

test('returns generation string', () => {
  expect(gs`I went to ${shops} and it was ${feeling}.`).toEqual({
    "args": [
      {
        combinations: 4,
        list: ["halfords", "tescos", "waitrose", "b&q"]
      }, 
      {
        combinations: 4,
        list: ["wonderful", "great", "poor", "disapointing"]
      },
    ],
    "combinations": 16,
    "stringParts": [
      "I went to ",
      " and it was ",
      "."
    ]
  });
});

test('creates a generation', () => {

  const generation = createGeneration([
    gs`I went to ${shops} and it was ${feeling}.`
  ]);
  
  expect(generation.generate(0)).toBe("I went to halfords and it was wonderful.");
});

test('calculates total combinations', () => {

  const generation = createGeneration([
    gs`I went to ${shops} and it was ${feeling}.`,
    gs`I went to ${shops} while ${activity}`
  ]);

  expect(generation.totalCombinations).toBe(28);
});