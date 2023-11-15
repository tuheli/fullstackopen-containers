import express from 'express';
import diagnoseService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(diagnoseService.getEntries());
});

export default router;