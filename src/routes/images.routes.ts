import express, { Router, Request, Response } from 'express';
import path from 'path';
import { IMAGE_NOT_FOUND_NAME, IMAGE_NOT_FOUND_PATH } from '../constants/config.constants';
import createImageThumb from '../services/convertion.service';
import {
  imageFullExists,
  getImageFullPath,
  imageThumbExists,
  getImageThumbPath,
} from '../services/image.service';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { filename: qFilename, width: qWidth, height: qHeight } = req.query;
  const filename: string | undefined = qFilename as string | undefined;
  const width: string | null = (qWidth as string | undefined) ?? null;
  const height: string | null = (qHeight as string | undefined) ?? null;

  if (!filename) {
    return res
      .setHeader('X-Filename', IMAGE_NOT_FOUND_NAME)
      .status(400)
      .sendFile(IMAGE_NOT_FOUND_PATH);
  }

  const imageExists: boolean = await imageFullExists(filename);
  if (!imageExists) {
    return res
      .setHeader('X-Filename', IMAGE_NOT_FOUND_NAME)
      .status(404)
      .sendFile(IMAGE_NOT_FOUND_PATH);
  }

  if (!width && !height) {
    return res.setHeader('X-Filename', filename).sendFile(getImageFullPath(filename));
  }

  if (await imageThumbExists(filename, width, height)) {
    const thumbPath = getImageThumbPath(filename, width, height);
    return res.setHeader('X-Filename', path.basename(thumbPath)).sendFile(thumbPath);
  }

  try {
    const imageThumbPath = await createImageThumb(filename, width, height);
    return res.setHeader('X-Filename', path.basename(imageThumbPath)).sendFile(imageThumbPath);
  } catch (error) {
    return res
      .setHeader('X-Filename', IMAGE_NOT_FOUND_NAME)
      .status(500)
      .sendFile(IMAGE_NOT_FOUND_PATH);
  }
});

export default router;
