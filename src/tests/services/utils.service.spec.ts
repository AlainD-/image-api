import { toNullableNumber, isSizeValid } from '../../services/utils.service';

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

  describe('isSizeValid', () => {
    it('should be valid if the size is null', () => {
      expect(isSizeValid(null)).toBeTruthy();
    });

    it('should be invalid if the size is an empty string', () => {
      expect(isSizeValid('')).toBeFalsy();
    });

    it('should be invalid if the size is not a number such as "a"', () => {
      expect(isSizeValid('a')).toBeFalsy();
    });

    it('should be invalid if the size is a negative number', () => {
      expect(isSizeValid('-1')).toBeFalsy();
    });

    it('should be invalid if the size is "0"', () => {
      expect(isSizeValid('0')).toBeFalsy();
    });

    it('should be valid if the size is a positive number', () => {
      expect(isSizeValid('1')).toBeTruthy();
    });
  });
});
