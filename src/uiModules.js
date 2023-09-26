const infoLocation = document.querySelector('#info-location');
const infoTemp = document.querySelector('#info-temp');
const infoGrid = document.querySelector('#info-grid');
const infoForecast = document.querySelector('#info-forecast');

function locationModule(data) {
  const location = document.createElement('p');
  const localTime = document.createElement('p');

  location.textContent = `${data.name}, ${data.country}`;
  localTime.textContent = `${data.localTime}`;

  infoLocation.append(location, localTime);
}

function tempModule(data, useUnit) {
  const conditionIcon = new Image();
  const temp = document.createElement('p');
  const conditionText = document.createElement('p');

  conditionIcon.src = `${data.condition.icon}`;
  temp.textContent = `${useUnit.temp}`;
  conditionText.textContent = `${data.condition.text}`;

  infoTemp.append(conditionIcon, temp, conditionText);
}

function gridModule(data, useUnit) {
  const createInfoItem = (imgSrc, divText, dataValue) => {
    const container = document.createElement('div');

    const img = new Image();
    const label = document.createElement('div');
    const value = document.createElement('p');

    container.classList.add('info-item');
    img.src = imgSrc;
    label.textContent = divText;
    value.textContent = dataValue;

    container.append(img, label, value);

    return container;
  };

  const feelsLike = createInfoItem('', 'Feels Like', useUnit.feelsLike);
  const humidity = createInfoItem('', 'Humidity', data.humidity);
  const precip = createInfoItem('', 'Precipitation', useUnit.precip);
  const wind = createInfoItem('', 'Wind Speed', useUnit.wind);
  const vis = createInfoItem('', 'Visibility', useUnit.vis);
  const uv = createInfoItem('', 'UV Index', data.uv);

  infoGrid.append(feelsLike, humidity, precip, wind, vis, uv);
}

function forecastModule(data, useUnit) {
  const card = document.createElement('div');
  const dateElement = document.createElement('p');
  const imgElement = document.createElement('img');
  const minTempElement = document.createElement('p');
  const maxTempElement = document.createElement('p');
  const conditionElement = document.createElement('p');
  const rainElement = document.createElement('p');

  card.classList.add('forecast-card');

  dateElement.textContent = data.date;
  imgElement.src = data.condition.icon;
  minTempElement.textContent = `${useUnit.mintemp} / ${useUnit.maxtemp}`;
  conditionElement.textContent = data.condition.text;
  rainElement.textContent = `Rain chance: ${data.rain}%`;

  card.append(
    dateElement,
    imgElement,
    minTempElement,
    maxTempElement,
    conditionElement,
    rainElement
  );
  infoForecast.append(card);
}

export { locationModule, tempModule, gridModule, forecastModule };
