import express, { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router: Router = express.Router();
const imagesRootPath = path.join(__dirname, '..', '..', 'assets', 'images');

router.get('/', (req: Request, res: Response) => {
  const imagePath = path.join(imagesRootPath, 'autumn-1.jpg');
  res.sendFile(imagePath);
});

export default router;
