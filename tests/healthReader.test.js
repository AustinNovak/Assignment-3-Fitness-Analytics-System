const { healthMetricsCounter } = require('../healthReader');
const path = require('path');

test('counts health entries correctly', async () => {
  const filePath = path.join(__dirname, '../data/health-metrics.json');
  const count = await healthMetricsCounter(filePath);
  expect(count).toBe(8);
});

test('throws error if file missing', async () => {
  await expect(healthMetricsCounter('./data/missing.json')).rejects.toThrow();
});
