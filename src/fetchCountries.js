const ENDPOINT = "https://restcountries.com/v3.1"

export function fetchCountries(name) {
    return fetch(`${ENDPOINT}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(
    (response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

