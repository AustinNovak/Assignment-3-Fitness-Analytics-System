require('dotenv').config();
const { workoutCalculator } = require('./workoutReader');
const { healthMetricsCounter } = require('./healthReader');

async function processFiles() {
  try {
    console.log(`Processing data for: ${process.env.USER_NAME}`);
    console.log('📁 Reading workout data...');
    const workoutData = await workoutCalculator('./data/workouts.csv');

    console.log('📁 Reading health data...');
    const healthData = await healthMetricsCounter('./data/health-metrics.json');

    console.log('\n=== SUMMARY ===');
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthData}`);
    console.log(`Weekly goal: ${process.env.WEEKLY_GOAL} minutes`);

    if (workoutData.totalMinutes >= parseInt(process.env.WEEKLY_GOAL)) {
      console.log(`🎉 Congratulations ${process.env.USER_NAME}! You have exceeded your weekly goal!`);
    } else {
      console.log(`💪 Keep going ${process.env.USER_NAME}! You’re ${process.env.WEEKLY_GOAL - workoutData.totalMinutes} minutes away from your goal.`);
    }
  } catch (error) {
    console.error('Error processing data:', error.message);
  }
}

processFiles();
