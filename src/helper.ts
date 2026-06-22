export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomIntArray = (length: number, min: number, max: number) => {
  const uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < length) {
    const randomNum = randomInt(min, max);
    uniqueNumbers.add(randomNum);
  }
  return Array.from(uniqueNumbers);
};
