import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import polarAiRoutes from './routes/polar-ai';

const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/polar-ai', polarAiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PolarVerse Backend' });
});

app.listen(PORT, () => {
  console.log(`PolarVerse Backend running on http://localhost:${PORT}`);
});
