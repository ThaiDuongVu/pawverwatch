export const setCookie = (name: string, value: string) => {
  document.cookie = "";
  // Doesn't expire (hopefully)
  document.cookie = `${name}=${value};expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

export const getCookie = (name: string) => {
  const newName = name + "=";
  const cookiesArray = document.cookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];
    while (cookie.charAt(0) === " ")
      cookie = cookie.substring(1);
    if (cookie.indexOf(newName) === 0)
      return cookie.substring(newName.length, cookie.length);
  }
  return "";
}
