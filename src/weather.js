/* eslint-disable import/prefer-default-export */

function processData(data) {
  const forecastDays = data.forecast.forecastday;
  const forecastProcessed = [];
  forecastDays.forEach((forecast) => {
    const forecastObj = {
      date: forecast.date,
      condition: {
        text: forecast.day.condition.text,
        icon: forecast.day.condition.icon,
      },
      rain: forecast.day.daily_chance_of_rain,

      metric: {
        maxtemp: `${forecast.day.maxtemp_c} ºC`,
        mintemp: `${forecast.day.mintemp_c} ºC`,
      },

      imperial: {
        maxtemp: `${forecast.day.maxtemp_f} ºF`,
        mintemp: `${forecast.day.mintemp_f} ºF`,
      },
    };
    forecastProcessed.push(forecastObj);
  });

  const weatherObj = {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    localTime: data.location.localtime,
    humidity: `${data.current.humidity}%`,
    uv: data.current.uv,

    condition: {
      text: data.current.condition.text,
      icon: data.current.condition.icon,
    },

    metric: {
      temp: `${data.current.temp_c} ºC`,
      feelsLike: `${data.current.feelslike_c} ºC`,
      precip: `${data.current.precip_mm} mm`,
      vis: `${data.current.vis_km} km`,
      wind: `${data.current.wind_kph} kph`,
    },

    imperial: {
      temp: `${data.current.temp_f} ºF`,
      feelsLike: `${data.current.feelslike_f} ºF`,
      precip: `${data.current.precip_in} in`,
      vis: `${data.current.vis_miles} miles`,
      wind: `${data.current.wind_mph} mph`,
    },

    forecast: forecastProcessed,
  };

  return weatherObj;
}

async function fetchWeather(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=c36ab4bfb1c341c285f151048231909&q=${location}&days=5`,
    { mode: 'cors' }
  );

  const rawData = await response.json();
  const data = processData(rawData);

  //   console.log(rawData);
  //   console.log(data);
  return data;
}

export { fetchWeather };
