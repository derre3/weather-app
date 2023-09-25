import { fetchData } from './weather';

async function searchLocation() {
  const data = await fetchData(searchInput.value);
  updateInfo(data);
  // console.log(data);
  searchInput.value = '';
}

function updateInfo(data) {
  let useUnit;
  if (unit === 0) useUnit = data.metric;
  else useUnit = data.imperial;
  const date = new Date(data.localTime);

  infoLocation[0].textContent = `${data.name}, ${data.country}`;
  infoLocation[1].textContent = `${date}`;

  infoTemp[0].src = `${data.condition.icon}`;
  infoTemp[1].textContent = `${useUnit.temp}`;
  infoTemp[2].textContent = `${data.condition.text}`;

  infoGrid[0].textContent = `Feels Like: ${useUnit.feelsLike}`;
  infoGrid[1].textContent = `Humidity: ${data.humidity}`;
  infoGrid[2].textContent = `Precipitation: ${useUnit.precip}`;
  infoGrid[3].textContent = `Wind Direction: ${data.wind_dir}`;
  infoGrid[4].textContent = `Wind Speed: ${useUnit.wind}`;
  infoGrid[5].textContent = `Wind Gust: ${useUnit.gust}`;
  infoGrid[6].textContent = `Visibility: ${useUnit.vis}`;
  infoGrid[7].textContent = `Atmospheric Pressure: ${useUnit.pressure}`;
  infoGrid[8].textContent = `UV index: ${data.uv}`;
}

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const infoLocation = document.querySelectorAll('#info-location *');
const infoTemp = document.querySelectorAll('#info-temp *');
const infoGrid = document.querySelectorAll('#info-grid *');
const metricButton = document.querySelector('#metric');
const imperialButton = document.querySelector('#imperial');

let unit = 0;
searchButton.addEventListener('click', searchLocation);
metricButton.addEventListener('click', () => {
  unit = 0;
});
imperialButton.addEventListener('click', () => {
  unit = 1;
});
