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
export const downloadFromURI = (uri: string, name: string) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Show a bootstrap toast
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = (bootstrap: any, id: string) => {
  const element = document.getElementById(id);
  const toast = bootstrap.Toast.getOrCreateInstance(element);
  toast.show();
};
