import express from "express";
import cors from "cors";
import auth from './routes/auth.js';
import gemini from './routes/gemini.js';
import user from './routes/user.js';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v0/login", auth);
app.use("/api/v0/user", user);
app.use("/api/v0", gemini);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});