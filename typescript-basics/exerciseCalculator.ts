type rating = 1 | 2 | 3;
interface result {
  numDays: number;
  numTrained: number;
  target: number;
  avgTime: number;
  success: boolean;
  rating: rating;
  comment: string;
}

const calculateExcercise = (
  dailyHourWorked: number[],
  targetHourPerDay: number
): result => {
  const numDays: number = dailyHourWorked.length;

  const target: number = targetHourPerDay;

  const avgTime: number = dailyHourWorked.reduce(
    (acc: number, curVal: number): number => acc + curVal / numDays,
    0
  );

  const numTrained: number = dailyHourWorked.filter(
    (dayHour: number): boolean => dayHour > 0
  ).length;

  const success: boolean = dailyHourWorked.every(
    (dayHour: number): boolean => dayHour >= target
  );

  let rating: rating;
  if (avgTime >= target) rating = 3;
  else if (avgTime >= target / 2) rating = 2;
  else rating = 1;

  let comment: string;
  if (rating == 3)
    comment =
      "Nailed it!" +
      (success ? "" : " but you didn't push hard enough on some days..");
  else if (rating == 2) comment = "strain a bit more, might reach heavens.";
  else comment = "work harder kid..";

  return {
    numDays,
    numTrained,
    target,
    avgTime,
    success,
    rating,
    comment,
  };
};

const parseInput = (args: string[]): number[] => {
  if (args.length < 2) throw new Error("need to provide at least 2 numbers");

  const inputs: number[] = [];
  args.forEach((arg: string, argIndex: number): void => {
    if (argIndex > 1) inputs.push(Number(arg));
  });

  if (inputs.some((input: number) => isNaN(input)))
    throw new Error("arguments must be numbers");

  return inputs;
};

const inputs: number[] = parseInput(process.argv);
console.log(calculateExcercise(inputs.slice(1), inputs[0]));

export default {
  calculateExcercise,
  parseInput,
};
