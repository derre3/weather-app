/* eslint-disable import/prefer-default-export */
import './style.css';
import './ui';

function processData(data) {
  const object = {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    localTime: data.location.localtime,
    humidity: data.current.humidity,
    wind_dir: data.current.wind_dir,
    condition: {
      text: data.current.condition.text,
      icon: data.current.condition.icon,
    },

    _metric: {
      temp: data.current.temp_c,
      feelsLike: data.current.feelslike_c,
      gust: data.current.gust_kph,
      precip: data.current.precip_mm,
      pressure: data.current.pressure_mb,
      vis: data.current.vis_km,
      wind: data.current.wind_kph,
    },

    _imperial: {
      temp: data.current.temp_f,
      feelsLike: data.current.feelslike_f,
      gust: data.current.gust_mph,
      precip: data.current.precip_in,
      pressure: data.current.pressure_in,
      vis: data.current.vis_miles,
      wind: data.current.wind_mph,
    },
  };

  return object;
}

async function fetchData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=c36ab4bfb1c341c285f151048231909&q=${location}`,
    { mode: 'cors' }
  );

  const rawData = await response.json();
  const data = processData(rawData);

  return data;
  //   console.log(rawData);
}

export { fetchData };
