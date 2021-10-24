import path from 'path';

export const IMAGES_ROOT_PATH: string = path.join(__dirname, '..', '..', 'assets', 'images');
export const IMAGES_FULL_PATH: string = path.join(IMAGES_ROOT_PATH, 'full');
export const IMAGES_THUMB_PATH: string = path.join(IMAGES_ROOT_PATH, 'thumb');
export const IMAGES_ERROR_PATH: string = path.join(IMAGES_ROOT_PATH, 'error');
export const IMAGE_NOT_FOUND_NAME = 'image-not-found.png';
export const IMAGE_NOT_FOUND_PATH: string = path.join(IMAGES_ERROR_PATH, IMAGE_NOT_FOUND_NAME);
