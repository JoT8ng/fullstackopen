interface trainingValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string | undefined;
    target: number;
    average: number;
}
  
interface inputValues {
    dailyHours: number[];
    target: number;
}
  
const parseArguments = (args: string[]): inputValues => {
    if (args.length < 10) throw new Error('Not enough arguments');
    if (args.length > 10) throw new Error('Too many arguments');
  
    const target = Number(args[2])
    const dailyHours = args.slice(3, 9).map(Number);

    if (!isNaN(target) && dailyHours.every(hour => !isNaN(hour))) {
        return {
            target,
            dailyHours,
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
}
  
const calculateExercises = (target: number, dailyHours: number[]): trainingValues => {
    const periodlength = dailyHours.length + 1;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodlength;
    const trainingdays = dailyHours.filter((hours) => hours > 0).length + 1;
  
    const success = average >= target ? true : false;
  
    let rating = 0;
    let description;
  
    if (average === target) {
      rating = 2;
      description = 'Yay you met your target! Great job!'
    } else if (average > target) {
      rating = 3;
      description = 'Wow you exceeded your target! Excellnt job! Keep up the good work!';
    } else if (average < target) {
      rating = 1;
      description = 'Unfortunately you did not meet your target';
    }
  
    return {
      periodLength: periodlength,
      trainingDays: trainingdays,
      success: success,
      rating: rating,
      ratingDescription: description,
      target: target,
      average: average
    }
}

try {
    const { target, dailyHours } = parseArguments(process.argv);
    const result = calculateExercises(target, dailyHours);
    console.log('Result:', result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}