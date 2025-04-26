import express from 'express'
import * as auth from '../controller/authController.js';
import * as note from '../controller/noteController.js';

const router = express.Router();

router.post('/', auth.check, async (req, res) => {
  const noteres = await note.post(req);
  res.status(201).send(noteres);
});

router.get('/', auth.check, async (req, res) => {
  const notes = await note.get(req);
  res.status(200).send(notes);
});

router.get('/:note_id', auth.check, async (req, res) => {
  const notes = await note.getOne(req, req.params.note_id);
  res.status(200).send(notes);
});

export default router;