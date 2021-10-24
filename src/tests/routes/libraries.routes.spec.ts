import supertest, { Response, SuperTest, Test } from 'supertest';
import app from '../../index';

const request: SuperTest<Test> = supertest(app);

describe('GET /api/v1/libraries', () => {
  const endpoint = '/api/v1/libraries';

  it('should return a list of image names', async () => {
    const response: Response = await request.get(endpoint);
    const { status, type, body } = response;
    expect(status).toBe(200);
    expect(type).toContain('json');
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.includes('autumn-1.jpg')).toBeTruthy();
  });
});
