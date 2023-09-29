import { fetchWeather } from './weather';
import {
  locationModule,
  tempModule,
  gridModule,
  forecastModule,
} from './uiModules';

function setDataState(data) {
  dataState = data;
}

async function searchLocation() {
  const data = await fetchWeather(searchInput.value);
  updateInfo(data, unit);
  searchInput.value = '';
  main.style.opacity = 1;
  return data;
}

function updateInfo(data, unit) {
  const infoLocationChildren = Array.from(
    document.querySelectorAll('#info-location *')
  );
  const infoTempChildren = Array.from(
    document.querySelectorAll('#info-temp *')
  );
  const infoGridChildren = Array.from(document.querySelectorAll('.info-item'));
  const infoForecastChildren = Array.from(
    document.querySelectorAll('#info-forecast *')
  );

  infoLocationChildren.forEach((node) => {
    node.remove();
  });
  infoTempChildren.forEach((node) => {
    node.remove();
  });
  infoGridChildren.forEach((node) => {
    node.remove();
  });
  infoForecastChildren.forEach((node) => {
    node.remove();
  });

  let useUnit;
  if (unit === 0) useUnit = data.metric;
  else useUnit = data.imperial;

  locationModule(data);
  tempModule(data, useUnit);
  gridModule(data, useUnit);
  forecastModule(data, unit);
}

const main = document.querySelector('main');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const metricButton = document.querySelector('#metric');
const imperialButton = document.querySelector('#imperial');

let dataState;
let unit = 0;
metricButton.classList.add('active');

searchButton.addEventListener('click', async () => {
  const data = await searchLocation();
  setDataState(data);
});
metricButton.addEventListener('click', () => {
  unit = 0;
  metricButton.classList.add('active');
  imperialButton.classList.remove('active');
  if (dataState) updateInfo(dataState, unit);
});
imperialButton.addEventListener('click', () => {
  unit = 1;
  metricButton.classList.remove('active');
  imperialButton.classList.add('active');
  if (dataState) updateInfo(dataState, unit);
});
