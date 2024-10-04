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

  if (planet.residents.length === 0) {
    info.innerHTML += '<p>Nenhum residente encontrado.</p>';
    return;
  };

  let table = document.createElement('table');
  let tr = ``
  
  let residents = planet.residents.map(async resident => {
    let results = await fetchApi(resident);
  
    tr += `
      <tr>
        <td>${results.name}</td>
        <td>${results.birth_year}</td>
      </tr>
    `;
  });

  await Promise.all(residents);
  
  table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nascimento</th>
        </tr>
      </thead>
      <tbody>
      ${tr}
      </tbody>
    </table>
  `
  info.appendChild(table);
};

async function fetchPlanet() {
  let search = document.getElementById('search').value;
  let {results} = await fetchApi(apiStarWars + '&search=' + search);
  let planet = results[0]
  infoPlanet(planet)
};

printPlanets();