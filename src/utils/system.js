import { loadWeather } from "@/utils/api.js"
import { icons } from "@/utils/constants.js"

import store from "@/store"

const LOCAL_KEY = "weathers"

async function init() {
  store.commit("IS_LOAD", true)
  const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]")
  const weathers = []

  for (let i = 0; i < local.length; i++) {
    const item = local[i]
    const weather = await loadWeather(item.name)

    weathers.push(weather)
  }

  localStorage.setItem(LOCAL_KEY, JSON.stringify(weathers))
  store.commit("INIT_WEATHERS", weathers)
  store.commit("IS_LOAD", false)
}

function averageValue(obj) {
  const temps = Object.values(obj)
  let sum = temps.reduce((acc, value) => acc + value, 0)

  const avValue = sum / temps.length

  return avValue
}

function formatWeekly(dt, options) {
  const today = new Date().getDate()
  const date = new Date(dt * 1000).getDate()
  const tomorrow = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000
  ).getDate()

  if (date === today) {
    return "Сегодня"
  } else if (date === tomorrow) {
    return "Завтра"
  }

  return new Date(dt * 1000).toLocaleString("ru-RU", options)
}

function generateURLIcon(item = {}) {
  const { icon } = item.weather[0]

  return require(`@/assets/images/icons/${icons[icon]}.svg`)
}

export { init, averageValue, formatWeekly, generateURLIcon }
