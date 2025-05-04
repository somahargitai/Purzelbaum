import express from 'express';
import { getHello, getSentences } from '../controllers/databaseController.js';

const router = express.Router();

router.get('/hello', getHello);
router.get('/sentences', getSentences);

export default router; 