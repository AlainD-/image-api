/**
 * Converts a string into a number
 * @param size {string|null} the size to convert to a number to
 * @returns {number|null} The converted number or null if the size is not a number
 */
export function toNullableNumber(size: string | null): number | null {
  if (!size) {
    return null;
  }

  const converted: number = parseInt(size, 10);
  if (Number.isNaN(converted)) {
    return null;
  }
  return converted;
}

/**
 * Checks if a string parameter is a valid size number
 * @param size {string|null}
 * @returns {boolean} True if the size is a positive number, false otherwise
 */
export function isSizeValid(size: string | null): boolean {
  if (size === null) {
    return true;
  }

  if (size.trim() === '') {
    return false;
  }

  const convertedNumber: number | null = toNullableNumber(size);
  if (convertedNumber === null) {
    return false;
  }

  return convertedNumber > 0;
}
