import express from 'express'
import * as auth from '../controller/authController.js';
import * as recall from '../controller/recallController.js';

const router = express.Router();

router.put('/:note_id', auth.check, async (req, res) => {
  const recallres = await recall.put(req, req.params.note_id);
  res.status(201).send(recallres);
});

router.get('/:note_id', auth.check, async (req, res) => {
  const recalls = await recall.get(req, req.params.note_id);
  res.status(200).send(recalls);
});

export default router;