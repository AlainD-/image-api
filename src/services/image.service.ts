import path from 'path';
import { promises as fs, constants } from 'fs';
import { IMAGES_FULL_PATH, IMAGES_THUMB_PATH } from '../constants/config.constants';
import { toNullableNumber } from './utils.service';

export function getThumbName(
  filename: string,
  width: string | null,
  height: string | null
): string {
  const widthN: number | null = toNullableNumber(width);
  const heightN: number | null = toNullableNumber(height);
  const widthExt: string = widthN ? `_w${widthN}` : '';
  const heightExt: string = heightN ? `_h${heightN}` : '';
  return `thumb${widthExt}${heightExt}_${filename}`;
}

export function getImageFullPath(filename: string): string {
  return path.join(IMAGES_FULL_PATH, filename);
}

export function getImageThumbPath(
  filename: string,
  width: string | null,
  height: string | null
): string {
  return path.join(IMAGES_THUMB_PATH, getThumbName(filename, width, height));
}

export async function imageFullExists(filename: string | undefined): Promise<boolean> {
  if (!filename) {
    return false;
  }

  try {
    await fs.access(getImageFullPath(filename), constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

export async function getThumbsByImageName(filename: string): Promise<string[]> {
  return (await fs.readdir(IMAGES_THUMB_PATH)).filter((fName: string) => fName.endsWith(filename));
}

export async function imageThumbExists(
  filename: string,
  width: string | null,
  height: string | null
): Promise<boolean> {
  const thumbFiles = await getThumbsByImageName(filename);
  const thumbName = getThumbName(filename, width, height);

  return thumbFiles.includes(thumbName);
}
