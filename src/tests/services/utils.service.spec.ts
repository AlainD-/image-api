import toNullableNumber from '../../services/utils.service';

describe('Utilities service', () => {
  describe('toNullableNumber', () => {
    it('should return the number 1 when the string represents the number "1"', () => {
      expect(toNullableNumber('1')).toBe(1);
    });

    it('should return null when the string is not parsable to a number', () => {
      expect(toNullableNumber('a')).toBe(null);
    });

    it('should return null when the parameter passed is null', () => {
      expect(toNullableNumber(null)).toBe(null);
    });
  });
});
