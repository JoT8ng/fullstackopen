/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { parseArgumentsBmi, calculateBmi } from './bmiCalculator';
import { calculateExercises, inputValues } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    const weightb = _req.query.weight;
    const heightb = _req.query.height;

    if (!weightb || !heightb) {
        res.status(400);
        res.send({ error: 'missing parameter height or weight' });
    } else {
        try {
            const { height, weight } = parseArgumentsBmi(
                Number(heightb),
                Number(weightb)
            );
            const bmiResult = calculateBmi(height, weight);
            res.send({
                weight: weight,
                height: height,
                bmi: bmiResult
            });
          } catch (error: unknown) {
            res.status(400);
            res.send({ error: (error as Error).message });
        }
    }
});

app.post('/exercises', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { dailyHours, target } = _req.body as inputValues;

    if (!dailyHours || !target) {
        res.status(400);
        res.send({ error: 'missing parameter dailyHours or target '});
    } else {
        try {
            const result = calculateExercises(target, dailyHours);
            res.send(result);
        } catch (error: unknown) {
            res.status(400);
            res.send({ error: (error as Error).message });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});