interface Operation {
    height: number;
    weight: number;
  }
  
  const parseArguments = (args: string[]): Operation => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  const calculateBmi = (height: number, weight: number): string => {
    const bmi = (weight / height / height) * 10000;
  
    if (bmi < 16) {
        return 'underweight (severe thinness)';
    } else if (bmi >= 16 && bmi < 16.9) {
        return 'underweight (moderate thinness)';
    } else if (bmi >= 17 && bmi < 18.4) {
        return 'underweight (mild thinness)';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'normal range';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'overweight (pre-obese)';
    } else if (bmi >= 30 && bmi < 34.9) {
        return 'obese (class I)';
    } else if (bmi >= 35 && bmi < 39.9) {
        return 'obese (class II)';
    } else if (bmi >= 40) {
        return 'obese (class III)';
    }
  }
  
  try {
    const { height, weight } = parseArguments(process.argv);
    const result = calculateBmi(height, weight);
    console.log('BMI Result:', result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }