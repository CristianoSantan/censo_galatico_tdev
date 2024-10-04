let apiStarWars = 'https://swapi.dev/api/planets/?format=json';

async function printPlanets() {
  let {results} = await fetchApi(apiStarWars);
  
  results.forEach(planet => console.log(planet.name));
};

async function fetchApi(url) {
  let res = await fetch(url);
  return await res.json();
};

printPlanets();