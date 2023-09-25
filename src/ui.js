import { fetchWeather } from './weather';

async function searchLocation() {
  const data = await fetchWeather(searchInput.value);
  if (infoForecast.children) {
    // eslint-disable-next-line no-plusplus
    const childrenLength = infoForecast.children.length;
    for (let i = 0; i < childrenLength; i += 1) {
      infoForecast.lastChild.remove();
    }
  }
  updateInfo(data);
  searchInput.value = '';
}

function updateInfo(data) {
  let useUnit;
  if (unit === 0) useUnit = data.metric;
  else useUnit = data.imperial;

  infoLocation[0].textContent = `${data.name}, ${data.country}`;
  infoLocation[1].textContent = `${data.localTime}`;

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

  data.forecast.forEach((day) => {
    if (unit === 0) useUnit = day.metric;
    else useUnit = day.imperial;

    const card = document.createElement('div');
    card.classList.add('forecast-card');
    const dateElement = document.createElement('p');
    const imgElement = document.createElement('img');
    const minTempElement = document.createElement('p');
    const maxTempElement = document.createElement('p');
    const conditionElement = document.createElement('p');

    dateElement.textContent = day.date;
    imgElement.src = day.condition.icon;
    minTempElement.textContent = `Min: ${useUnit.mintemp}`;
    maxTempElement.textContent = `Max: ${useUnit.maxtemp}`;
    conditionElement.textContent = day.condition.text;

    card.append(
      dateElement,
      imgElement,
      minTempElement,
      maxTempElement,
      conditionElement
    );
    infoForecast.append(card);
  });
}

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const infoLocation = document.querySelectorAll('#info-location *');
const infoTemp = document.querySelectorAll('#info-temp *');
const infoGrid = document.querySelectorAll('#info-grid *');
const infoForecast = document.querySelector('#info-forecast');
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
