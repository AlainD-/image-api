import supertest, { Response, SuperTest, Test } from 'supertest';
import app from '../../index';

const request: SuperTest<Test> = supertest(app);

describe('GET /api/libraries', () => {
  const endpoint = '/api/libraries';

  it('should return a list', async () => {
    const response: Response = await request.get(endpoint);
    const { status, type, body } = response;
    expect(status).toBe(200);
    expect(type).toContain('json');
    expect(Array.isArray(body)).toBeTruthy();
  });
});
