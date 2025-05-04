import express from 'express';
import { analyzeSentence, explainTranslation } from '../controllers/openaiController.js';

const router = express.Router();

router.post('/analyze', analyzeSentence);
router.post('/explainTranslation', explainTranslation);

export default router; 