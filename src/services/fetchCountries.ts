import sortStringsAlphabetically from "../helperFunctions/sortStringsAlphabetically";

const fetchCountries = async () => {
  // setLoading(true);
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  const orderedCountries = sortStringsAlphabetically(
    data.map((country: any) => country.name.common)
  );
  return orderedCountries;
};

export default fetchCountries;
