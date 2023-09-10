export const fetcher = (input, init?) => {
  return fetch(input, init).then((response) => {
    if (response.ok) return response.json();
    else throw new Error(response.statusText);
  });
};
