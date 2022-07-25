import store from "@/store"
import { loadWeather } from "@/utils/api.js"

const LOCAL_KEY = "weathers"

async function init() {
  const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]")
  const weathers = []

  for (let i = 0; i < local.length; i++) {
    const item = local[i]
    const weather = await loadWeather(item.name)

    weathers.push(weather)
  }

  localStorage.setItem(LOCAL_KEY, JSON.stringify(weathers))
  store.commit("INIT_WEATHERS", weathers)
}

function averageValue(obj) {
  const temps = Object.values(obj)
  let sum = 0

  temps.forEach(item => {
    sum += item
  })

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

export { init, averageValue, formatWeekly }
