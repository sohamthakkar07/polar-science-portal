import { Router } from 'express';
// controllers will go here
import { chat, explain, search, research, quiz, getSource, getRelated } from '../controllers/polar-ai-controller';

const router = Router();

router.post('/chat', chat);
router.post('/explain', explain);
router.post('/search', search);
router.post('/research', research);
router.post('/quiz', quiz);
router.get('/sources/:id', getSource);
router.get('/related/:entityType/:id', getRelated);

export default router;
