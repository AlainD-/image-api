import express, { Router, Request, Response } from 'express';
import path from 'path';
import { isSizeValid } from '../services/utils.service';
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

  if (!isSizeValid(width)) {
    return res.status(400).send('The specified width is not a valid positive number');
  }

  if (!isSizeValid(height)) {
    return res.status(400).send('The specified height is not a valid positive number');
  }

  if (!filename) {
    return res.status(400).send('The filename parameter is required but was not found');
  }

  const imageExists: boolean = await imageFullExists(filename);
  if (!imageExists) {
    return res.status(404).send('The specified image was not found');
  }

  if (!width && !height) {
    res.setHeader('X-Filename', filename);
    return res.sendFile(getImageFullPath(filename));
  }

  if (await imageThumbExists(filename, width, height)) {
    const thumbPath = getImageThumbPath(filename, width, height);
    res.setHeader('X-Filename', path.basename(thumbPath));
    return res.sendFile(thumbPath);
  }

  try {
    const imageThumbPath = await createImageThumb(filename, width, height);
    res.setHeader('X-Filename', path.basename(imageThumbPath));
    return res.sendFile(imageThumbPath);
  } catch (error) {
    return res
      .status(500)
      .sendFile('An unexpected error occurred while creating the thumbnail of the image');
  }
});

export default router;
