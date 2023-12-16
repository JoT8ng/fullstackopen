import express from 'express';
import { parseArgumentsBmi, calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', async (_req, res) => {
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
          } catch (error) {
            res.status(400);
            res.send({ error: error.message });
        }
    }
  })

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});