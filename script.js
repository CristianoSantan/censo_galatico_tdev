let apiStarWars = 'https://swapi.dev/api/planets/?format=json';
let planets = document.getElementById('planets');
let info = document.getElementById('info');

async function printPlanets() {
  let {results} = await fetchApi(apiStarWars);
  
  results.forEach(planet => {
    let button = document.createElement('button');
    button.textContent = planet.name;
    button.onclick = () => infoPlanet(planet);
    planets.appendChild(button);
  });
};

async function fetchApi(url) {
  let res = await fetch(url);
  return await res.json();
};

async function infoPlanet(planet) {
  let div = document.createElement('div');
  info.innerHTML = '';
  div.innerHTML = `
    <ul>
      <li><b>Planeta:</b> ${planet.name}</li>
      <li><b>Clima:</b>  ${planet.climate}</li>
      <li><b>População:</b>  ${planet.population}</li>
      <li><b>Terreno:</b>  ${planet.terrain}</li>
    </ul>
  `;

  info.appendChild(div);
};

async function fetchPlanet() {
  let search = document.getElementById('search').value;
  let {results} = await fetchApi(apiStarWars + '&search=' + search);
  let planet = results[0]
  infoPlanet(planet)
};

printPlanets();