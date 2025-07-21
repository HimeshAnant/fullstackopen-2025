interface input {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Healthy weight";
  else if (bmi < 30) return "Overweight";
  else return "Obese";
};

const parseInput = (args: string[]): input => {
  if (args.length !== 4)
    throw new Error("need to pass exactly 2 parameters, height and weight");

  const height: number = Number(args[2]);
  const weight: number = Number(args[3]);
  if (isNaN(height) || isNaN(weight))
    throw new Error("both input needs to be number");

  return {
    height,
    weight,
  };
};

if (require.main === module) {
  const input: input = parseInput(process.argv);
  console.log(calculateBmi(input.height, input.weight));
}

export default {
  calculateBmi,
  parseInput,
};
