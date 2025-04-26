import express from 'express'
import * as auth from '../controller/authController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const results = await auth.login(req);
    res.send(results).status(200);
  } catch (err) {
    if (err) {
      res.status(404).send();
    }
  }
})

export default router;