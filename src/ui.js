import { fetchData } from './index';

async function searchLocation() {
  const data = await fetchData(searchInput.value);
  updateInfo(data);
  console.log(data);
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
}

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const infoLocation = document.querySelectorAll('#info-location *');
const infoTemp = document.querySelectorAll('#info-temp *');
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
