import express, { Router, Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';

const router: Router = express.Router();
const imagesRootPath = path.join(__dirname, '..', '..', 'assets', 'imagess');

router.get('/', async (req: Request, res: Response) => {
  let files: string[];
  try {
    files = await fs.readdir(imagesRootPath);
  } catch (error) {
    return res.status(500).send('Could not list the available images');
  }

  const images: string[] = files.filter((filename) =>
    ['.jpg', '.png'].includes(path.extname(filename).toLowerCase())
  );
  return res.send(images);
});

export default router;
