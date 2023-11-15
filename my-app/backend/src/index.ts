import express, { RequestHandler } from 'express';
import cors, { CorsOptions } from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const PORT = 3001;

const app = express();
app.use(express.json());

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43909
app.use((cors as (options: CorsOptions) => RequestHandler)({}));

app.get('/api/ping', (_req, res) => {
  res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
