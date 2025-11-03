// Test your workoutReader.js module here
const { workoutCalculator } = require('../workoutReader');
const path = require('path');

test('counts workouts and total minutes correctly', async () => {
  const filePath = path.join(__dirname, '../data/workouts.csv');
  const result = await workoutCalculator(filePath);
  expect(result.totalWorkouts).toBe(10);
  expect(result.totalMinutes).toBe(330);
});

test('throws error if file missing', async () => {
  await expect(workoutCalculator('./data/missing.csv')).rejects.toThrow();
});
