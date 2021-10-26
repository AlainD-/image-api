import sharp from 'sharp';
import { getImageFullPath, getImageThumbPath } from './image.service';
import { toNullableNumber } from './utils.service';

export default async function createImageThumb(
  filename: string,
  width: string | null,
  height: string | null
): Promise<string> {
  try {
    const imageThumbPath: string = getImageThumbPath(filename, width, height);
    await sharp(getImageFullPath(filename))
      .resize(toNullableNumber(width), toNullableNumber(height), {
        fit: width && height ? 'fill' : 'cover',
      })
      .toFile(imageThumbPath);
    return imageThumbPath;
  } catch (error) {
    throw new Error('An unexpected error occurred during the creation of the thumbnail!');
  }
}
