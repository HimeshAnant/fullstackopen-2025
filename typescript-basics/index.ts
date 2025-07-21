import express from "express";
import qs from "qs";
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const query: object = req.query;
  if (!("height" in query) || !("weight" in query)) {
    return res
      .status(400)
      .json({ error: "height and weight must be provided" });
  }

  const height: number = Number(query.height);
  const weight: number = Number(query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res
      .status(400)
      .json({ error: "height and weight should be number" });
  }

  const bmi = bmiCalculator.calculateBmi(height, weight);
  return res.json({ bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  const analysisData = exerciseCalculator.calculateExcercise(
    daily_exercises,
    target
  );
  res.json(analysisData);
});

app.set("query parser", (str: string): object => {
  return qs.parse(str);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("connected to PORT:", PORT);
});
