import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../server.js';

describe('Database Routes', () => {
  it('should get all sentences', async () => {
    const response = await request(app)
      .get('/api/database/sentences');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
}); 