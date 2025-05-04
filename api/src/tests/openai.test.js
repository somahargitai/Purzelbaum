import { describe, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';

// Mock the OpenAI controller
jest.mock('../controllers/openaiController.js', () => ({
  analyzeSentence: jest.fn().mockResolvedValue({ analysis: 'Test analysis' }),
  explainTranslation: jest.fn().mockResolvedValue({
    correctConjugations: ['am learning'],
    incorrectConjugations: ['learn']
  })
}));

describe('OpenAI API', () => {
  it('should analyze a sentence', async () => {
    const response = await request(app)
      .post('/api/openai/analyze')
      .send({ sentence: 'Ich lerne Deutsch' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('analysis');
  }, 10000); // Increased timeout to 10 seconds

  it('should explain translation differences', async () => {
    const response = await request(app)
      .post('/api/openai/explainTranslation')
      .send({
        original: 'Ich lerne Deutsch',
        correct: 'I am learning German',
        userInput: 'I learn German'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('correctConjugations');
    expect(response.body).toHaveProperty('incorrectConjugations');
  }, 10000); // Increased timeout to 10 seconds
}); 