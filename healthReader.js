const fs = require('fs').promises;

async function healthMetricsCounter(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(data);

    if (!json.metrics || !Array.isArray(json.metrics)) {
      throw new Error('Invalid JSON structure');
    }

    const totalEntries = json.metrics.length;
    console.log(`Total health entries: ${totalEntries}`);

    return totalEntries;
  } catch (error) {
    console.error('Error reading health data:', error.message);
    throw error;
  }
}

module.exports = { healthMetricsCounter };
