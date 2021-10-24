import supertest, { Response, SuperTest, Test } from 'supertest';
import { IMAGE_NOT_FOUND_NAME } from '../../constants/config.constants';
import app from '../../index';

const request: SuperTest<Test> = supertest(app);

describe('GET /api/v1/images', () => {
  const endpoint = '/api/v1/images';

  it('should respond the fallback image with status 400 if the filename param is missing', async () => {
    const response: Response = await request.get(endpoint);
    const { status, type, header } = response;
    expect(status).toBe(400);
    expect(type).toContain('image');
    expect('x-filename' in header).toBeTruthy();
    expect(header['x-filename']).toBe(IMAGE_NOT_FOUND_NAME);
  });

  it('should respond the fallback jpg image with status 404 when the image does not exist', async () => {
    const response: Response = await request.get(`${endpoint}?filename=inexistentimage`);
    const { status, type, header } = response;
    expect(status).toBe(404);
    expect(type).toContain('image');
    expect('x-filename' in header).toBeTruthy();
    expect(header['x-filename']).toBe(IMAGE_NOT_FOUND_NAME);
  });

  it('should respond the full image with status 200 when no resizing params are passed', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg`);
    const { status, type, header } = response;
    expect(status).toBe(200);
    expect(type).toContain('image');
    expect('x-filename' in header).toBeTruthy();
    expect(header['x-filename']).toBe('autumn-1.jpg');
  });

  it('should respond the thumb image "thumb_w1_autumn-1.jpg" with status 200 when width "1" is passed', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&width=1`);
    const { status, type, header } = response;
    expect(status).toBe(200);
    expect(type).toContain('image');
    expect('x-filename' in header).toBeTruthy();
    expect(header['x-filename']).toBe('thumb_w1_autumn-1.jpg');
  });

  it('should respond the thumb image "thumb_h2_autumn-1.jpg" with status 200 when height "2" is passed', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&height=2`);
    const { status, type, header } = response;
    expect(status).toBe(200);
    expect(type).toContain('image');
    expect('x-filename' in header).toBeTruthy();
    expect(header['x-filename']).toBe('thumb_h2_autumn-1.jpg');
  });

  it('should respond the thumb image "thumb_w1_h2_autumn-1.jpg" with status 200 when width "1" and height "2" are passed', async () => {
    const response: Response = await request.get(
      `${endpoint}?filename=autumn-1.jpg&width=1&height=2`
    );
    const { status, type, header } = response;
    expect(status).toBe(200);
    expect(type).toContain('image');
    expect('x-filename' in header).toBeTruthy();
    expect(header['x-filename']).toBe('thumb_w1_h2_autumn-1.jpg');
  });
});
