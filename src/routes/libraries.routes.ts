import express, { Router, Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import { IMAGES_FULL_PATH } from '../constants/config.constants';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let files: string[];
  try {
    files = await fs.readdir(IMAGES_FULL_PATH);
  } catch (error) {
    return res.status(500).send('Could not list the available images');
  }

  const images: string[] = files.filter((filename) =>
    ['.jpg', '.png'].includes(path.extname(filename).toLowerCase())
  );
  return res.send(images);
});

export default router;
