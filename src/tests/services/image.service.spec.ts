import path from 'path';
import {
  getImageFullPath,
  getThumbName,
  getImageThumbPath,
  imageFullExists,
  getThumbsByImageName,
  imageThumbExists,
} from '../../services/image.service';

describe('Image service', () => {
  describe('getThumbName', () => {
    it('should return "thumb_a.jpg" for image "a.jpg" without resizing', () => {
      expect(getThumbName('a.jpg', null, null)).toBe('thumb_a.jpg');
    });

    it('should return "thumb_w1_a.jpg" for image "a.jpg" without resizing', () => {
      expect(getThumbName('a.jpg', '1', null)).toBe('thumb_w1_a.jpg');
    });

    it('should return "thumb_h2_a.jpg" for image "a.jpg" without resizing', () => {
      expect(getThumbName('a.jpg', null, '2')).toBe('thumb_h2_a.jpg');
    });

    it('should return "thumb_w1_h2_a.jpg" for image "a.jpg" without resizing', () => {
      expect(getThumbName('a.jpg', '1', '2')).toBe('thumb_w1_h2_a.jpg');
    });
  });

  describe('getImageFullPath', () => {
    it('should return the full path of the image "a.jpg"', () => {
      const imagePath = getImageFullPath('a.jpg');
      expect(path.basename(imagePath)).toBe('a.jpg');
      expect(path.basename(path.dirname(imagePath))).toBe('full');
    });
  });

  describe('getImageThumbPath', () => {
    const image = 'a.jpg';

    it('should return "thumb/thumb_a.jpg" without resizing', () => {
      const imagePath = getImageThumbPath(image, null, null);
      expect(path.basename(imagePath)).toBe('thumb_a.jpg');
      expect(path.basename(path.dirname(imagePath))).toBe('thumb');
    });

    it('should return "thumb/thumb_w1_a.jpg" with width "1"', () => {
      const imagePath = getImageThumbPath(image, '1', null);
      expect(path.basename(imagePath)).toBe('thumb_w1_a.jpg');
      expect(path.basename(path.dirname(imagePath))).toBe('thumb');
    });

    it('should return "thumb/thumb_h2_a.jpg" with height "2"', () => {
      const imagePath = getImageThumbPath(image, null, '2');
      expect(path.basename(imagePath)).toBe('thumb_h2_a.jpg');
      expect(path.basename(path.dirname(imagePath))).toBe('thumb');
    });

    it('should return "thumb/thumb_w1_h2_a.jpg" with width "1" and height "2"', () => {
      const imagePath = getImageThumbPath(image, '1', '2');
      expect(path.basename(imagePath)).toBe('thumb_w1_h2_a.jpg');
      expect(path.basename(path.dirname(imagePath))).toBe('thumb');
    });
  });

  describe('imageFullExists', () => {
    it('should find that "autumn-1.jpg" exists', async () => {
      expect(await imageFullExists('autumn-1.jpg')).toBe(true);
    });
    it('should find that "a.jpg" does not exist', async () => {
      expect(await imageFullExists('a.jpg')).toBe(false);
    });
    it('should find that undefined does not exist', async () => {
      expect(await imageFullExists(undefined)).toBe(false);
    });
  });

  describe('getThumbsByImageName', () => {
    it('should return a list of image names', async () => {
      expect(await getThumbsByImageName('autumn-1.jpg')).toEqual(jasmine.any(Array));
    });
  });

  describe('imageThumbExists', () => {
    it('should return a boolean', async () => {
      expect(await imageThumbExists('autumn-1.jpg', '1', '2')).toEqual(jasmine.any(Boolean));
    });
  });
});
