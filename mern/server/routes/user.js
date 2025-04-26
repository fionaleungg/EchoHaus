import express from 'express';
import * as user from '../controller/userController.js';
import * as auth from '../controller/authController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await user.signup(req);
    res.status(201).send();
  } catch (error) {
    if (error.message == 'Email already registered') {
      res.status(409).send();
    }
  }
});

router.get('/', auth.check, async (req, res) => {
  try {
    const result = await user.get(req);
    res.status(200).send(result);
  } catch (error) {
    if (error) {
      res.status(404).send();
    }
  }
});

export default router;