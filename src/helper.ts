// Generate a random integer between a range
export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate an array of random integers between a range
export const randomIntArray = (length: number, min: number, max: number) => {
  const uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < length) {
    const randomNum = randomInt(min, max);
    uniqueNumbers.add(randomNum);
  }
  return Array.from(uniqueNumbers);
};

// Download image from a URI
export const downloadURI = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
