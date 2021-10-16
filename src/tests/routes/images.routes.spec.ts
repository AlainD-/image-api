import supertest, { Response, SuperTest, Test } from 'supertest';
import app from '../../index';

const request: SuperTest<Test> = supertest(app);

describe('GET /api/images', () => {
  const endpoint = '/api/images';

  it('should respond a jpg image', async () => {
    const response: Response = await request.get(endpoint);
    const { status, type } = response;
    expect(status).toBe(200);
    expect(type).toContain('image');
  });

  it('should respond the fallback jpg image when the filename does not exist', async () => {
    const response: Response = await request.get(`${endpoint}?filename=inexistentimage`);
    const { status, type } = response;
    expect(status).toBe(200);
    expect(type).toContain('image');
  });
});
