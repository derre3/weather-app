import { format } from 'date-fns';
import tempIcon from './icons/temp.svg';
import humidityIcon from './icons/humidity.svg';
import precipIcon from './icons/precip.svg';
import windIcon from './icons/wind.svg';
import visIcon from './icons/vis.svg';
import uvIcon from './icons/uv.svg';

const infoLocation = document.querySelector('#info-location');
const infoTemp = document.querySelector('#info-temp');
const infoGrid = document.querySelector('#info-grid');
const infoForecast = document.querySelector('#info-forecast');

function locationModule(data) {
  const location = document.createElement('p');
  const localTime = document.createElement('p');
  const date = new Date(data.localTime);

  location.textContent = `${data.name}, ${data.country}`;
  localTime.textContent = format(date, 'cccc, MMMM dd');

  infoLocation.append(location, localTime);
}

function tempModule(data, useUnit) {
  const conditionIcon = new Image();
  const temp = document.createElement('p');
  const conditionText = document.createElement('p');
  const hours = document.createElement('p');
  const date = new Date(data.localTime);

  hours.textContent = format(date, 'HH:mm');
  conditionIcon.src = `${data.condition.icon}`;
  temp.textContent = `${useUnit.temp}`;
  conditionText.textContent = `${data.condition.text}`;

  infoTemp.append(hours, conditionIcon, temp, conditionText);
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

  const feelsLike = createInfoItem(tempIcon, 'Feels Like', useUnit.feelsLike);
  const humidity = createInfoItem(humidityIcon, 'Humidity', data.humidity);
  const precip = createInfoItem(precipIcon, 'Precipitation', useUnit.precip);
  const wind = createInfoItem(windIcon, 'Wind Speed', useUnit.wind);
  const vis = createInfoItem(visIcon, 'Visibility', useUnit.vis);
  const uv = createInfoItem(uvIcon, 'UV Index', data.uv);

  infoGrid.append(feelsLike, humidity, precip, wind, vis, uv);
}

function forecastModule(data, unit) {
  data.forecast.forEach((day) => {
    let useUnit;
    if (unit === 0) useUnit = day.metric;
    else useUnit = day.imperial;

    const card = document.createElement('div');
    const dateElement = document.createElement('p');
    const weekDayElement = document.createElement('p');
    const imgElement = document.createElement('img');
    const minTempElement = document.createElement('p');
    const maxTempElement = document.createElement('p');
    const conditionElement = document.createElement('p');
    const rainElement = document.createElement('p');

    card.classList.add('forecast-card');

    const date = new Date(`${day.date} 00:00`);
    if (data.forecast.indexOf(day) !== 0)
      dateElement.textContent = format(date, 'dd/MM');
    else dateElement.textContent = 'Today';

    weekDayElement.textContent = format(date, 'cccc');
    imgElement.src = day.condition.icon;
    minTempElement.textContent = `${useUnit.mintemp} / ${useUnit.maxtemp}`;
    conditionElement.textContent = day.condition.text;
    rainElement.textContent = `Rain chance: ${day.rain}%`;

    card.append(
      dateElement,
      weekDayElement,
      imgElement,
      minTempElement,
      maxTempElement,
      conditionElement,
      rainElement
    );
    infoForecast.append(card);
  });
}

function loaderModule() {
  const add = () => {
    const searchContainer = document.querySelector('#search-container');
    const loader = document.createElement('div');

    loader.id = 'loader';

    searchContainer.append(loader);
  };

  const remove = () => {
    const loader = document.querySelector('#loader');
    loader.remove();
  };

  return { add, remove };
}

export { locationModule, tempModule, gridModule, forecastModule, loaderModule };
