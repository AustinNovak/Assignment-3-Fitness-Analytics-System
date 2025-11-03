const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    // ✅ Check if file exists before streaming
    if (!fs.existsSync(filePath)) {
      return reject(new Error('File not found'));
    }

    const workouts = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        workouts.push(row);
      })
      .on('end', () => {
        const totalWorkouts = workouts.length;
        let totalMinutes = 0;

        for (let i = 0; i < workouts.length; i++) {
          totalMinutes += parseFloat(workouts[i].duration);
        }

        console.log(`Total workouts: ${totalWorkouts}`);
        console.log(`Total minutes: ${totalMinutes}`);

        resolve({ totalWorkouts, totalMinutes });
      })
      .on('error', (err) => {
        console.error('Error reading workout data:', err.message);
        reject(err);
      });
  });
}

module.exports = { workoutCalculator };
