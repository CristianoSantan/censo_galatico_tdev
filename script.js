let apiStarWars = 'https://swapi.dev/api/planets/?format=json';
let planets = document.getElementById('planets');

async function printPlanets() {
  let {results} = await fetchApi(apiStarWars);
  
  results.forEach(planet => {
    let button = document.createElement('button');
    button.textContent = planet.name;
    planets.appendChild(button);
  });
};

async function fetchApi(url) {
  let res = await fetch(url);
  return await res.json();
};

printPlanets();