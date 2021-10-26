import supertest, { Response, SuperTest, Test } from 'supertest';
import app from '../../index';

const request: SuperTest<Test> = supertest(app);

describe('GET /api/v1/images', () => {
  const endpoint = '/api/v1/images';

  it('should respond a 400 error if the filename param is missing', async () => {
    const response: Response = await request.get(endpoint);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('filename parameter is required');
  });

  it('should respond a 400 error if the width param is not a valid number', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&width=a`);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('width is not a valid positive number');
  });

  it('should respond a 400 error if the width param is 0', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&width=0`);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('width is not a valid positive number');
  });

  it('should respond a 400 error if the width param is -1', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&width=-1`);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('width is not a valid positive number');
  });

  it('should respond a 400 error if the height param is not a valid number', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&height=a`);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('height is not a valid positive number');
  });

  it('should respond a 400 error if the height param is 0', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&height=0`);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('height is not a valid positive number');
  });

  it('should respond a 400 error if the height param is -1', async () => {
    const response: Response = await request.get(`${endpoint}?filename=autumn-1.jpg&height=-1`);
    const { status, type, text } = response;
    expect(status).toBe(400);
    expect(type).toContain('text');
    expect(text).toContain('height is not a valid positive number');
  });

  it('should respond a 404 error when the image does not exist', async () => {
    const response: Response = await request.get(`${endpoint}?filename=inexistentimage`);
    const { status, type, text } = response;
    expect(status).toBe(404);
    expect(type).toContain('text');
    expect(text).toContain('image was not found');
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
