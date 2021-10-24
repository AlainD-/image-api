export default function toNullableNumber(size: string | null): number | null {
  if (!size) {
    return null;
  }

  const converted: number = parseInt(size, 10);
  if (Number.isNaN(converted)) {
    return null;
  }
  return converted;
}
