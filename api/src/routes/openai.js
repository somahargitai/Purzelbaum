import express from "express";
import {
  analyzeSentence,
  explainTranslation,
  freeTalk,
} from "../controllers/openaiController.js";

const router = express.Router();

router.post("/analyze", analyzeSentence);
router.post("/explainTranslation", explainTranslation);
router.post("/freeTalk", freeTalk);

export default router;
