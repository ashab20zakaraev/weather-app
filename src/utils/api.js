import axios from "axios"

const data = {
  API_KEY: "3a62a5fc60b1648b9a91078378dd943d",
  LANG: "ru",
  URL: "https://api.openweathermap.org/",
}

function loadWeather(name) {
  return axios
    .get(
      `${data.URL}data/2.5/weather?lang=${data.LANG}&appid=${data.API_KEY}&units=metric&q=${name}`
    )
    .then(item => item.data)
}

function loadWeatherInfoDaily(coord) {
  return axios
    .get(
      `${data.URL}data/2.5/onecall?lang=${data.LANG}&appid=${data.API_KEY}&units=metric&lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts`
    )
    .then(item => item.data)
}

export { loadWeather, loadWeatherInfoDaily }
