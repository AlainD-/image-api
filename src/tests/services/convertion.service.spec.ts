import createImageThumb from '../../services/convertion.service';

describe('Convertion service', () => {
  describe('createImageThumb', () => {
    const imageName = 'autumn-1.jpg';
    const error = 'An unexpected error occurred during the creation of the thumbnail!';

    it('should return the path of the full image "autumn-1.jpg" without width and height specified', async () => {
      const imagePath = await createImageThumb(imageName, null, null);
      expect(imagePath).toContain('thumb_autumn-1.jpg');
    });

    it('should return the path of the thumbnail "thumb_w2_autumn-1.jpg" with width "2" only specified', async () => {
      const imagePath = await createImageThumb(imageName, '2', null);
      expect(imagePath).toContain('thumb_w2_autumn-1.jpg');
    });

    it('should return the path of the thumbnail "thumb_h3_autumn-1.jpg" with height "3" only specified', async () => {
      const imagePath = await createImageThumb(imageName, null, '3');
      expect(imagePath).toContain('thumb_h3_autumn-1.jpg');
    });

    it('should return the path of the thumbnail "thumb_w1_h2_autumn-1.jpg" with width "1" and height "2"', async () => {
      const imagePath = await createImageThumb(imageName, '1', '2');
      expect(imagePath).toContain('thumb_w1_h2_autumn-1.jpg');
    });

    it('should throw an error if the width is 0', async () => {
      await expectAsync(createImageThumb(imageName, '0', '2')).toBeRejectedWithError(error);
    });

    it('should throw an error if the height is 0', async () => {
      await expectAsync(createImageThumb(imageName, '1', '0')).toBeRejectedWithError(error);
    });

    it('should throw an error if the width is a negative number', async () => {
      await expectAsync(createImageThumb(imageName, '-1', '2')).toBeRejectedWithError(error);
    });

    it('should throw an error if the height is a negative number', async () => {
      await expectAsync(createImageThumb(imageName, '1', '-1')).toBeRejectedWithError(error);
    });
  });
});
