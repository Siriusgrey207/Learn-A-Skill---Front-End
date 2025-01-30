const fetchCities = async (country: string) => {
  const url = "https://countriesnow.space/api/v0.1/countries/cities";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country }),
    });
    const res = await response.json();
    const cities = res.data;
    return cities;
  } catch (error) {
    console.error(
      `Something went wrong while fetching the cities for ${country}.`,
      error
    );
    return [];
  }
};

export default fetchCities;
