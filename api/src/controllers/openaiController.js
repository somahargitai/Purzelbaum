import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const analyzeSentence = async (req, res) => {
  try {
    const { sentence } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a German language teacher. Analyze the given German sentence and explain its grammar, focusing on conjugations, cases, and word order.",
        },
        {
          role: "user",
          content: `Analyze this German sentence: ${sentence}`,
        },
      ],
      model: "gpt-4",
    });

    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error analyzing sentence:", error);
    res.status(500).json({ error: "Failed to analyze sentence" });
  }
};

export const explainTranslation = async (req, res) => {
  try {
    const { original, correct, userInput } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a German language teacher. Analyze the translation and provide a list of correct and incorrect conjugations.
Focus on:
- Noun cases (nominative, accusative, dative, genitive)
- Verb conjugations
- Article usage (der, die, das)
- Preposition cases
- Adjective endings

For each point, provide a brief explanation (max 10 words).
Format the response as a JSON object with two arrays:
{
  "correctConjugations": ["brief explanation 1", "brief explanation 2"],
  "incorrectConjugations": ["brief explanation 1", "brief explanation 2"]
}

IMPORTANT: Respond ONLY with the JSON object, no additional text.`,
        },
        {
          role: "user",
          content: `Original sentence: ${original}
Correct translation: ${correct}
User's translation: ${userInput}`,
        },
      ],
      model: "gpt-4",
    });

    const response = JSON.parse(completion.choices[0].message.content);
    res.json(response);
  } catch (error) {
    console.error("Error explaining translation:", error);
    res.status(500).json({ error: "Failed to analyze translation" });
  }
};

export const freeTalk = async (req, res) => {
  try {
    const { message } = req.body;
  } catch (error) {
    console.error("Error in freeTalk:", error);
    res.status(500).json({ error: "Failed to process free talk" });
  }
};
