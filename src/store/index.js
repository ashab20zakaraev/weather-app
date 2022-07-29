import { createStore } from "vuex"
import { loadWeather, loadWeatherInfoDaily } from "@/utils/api.js"

const LOCAL_KEY = "weathers"

export default createStore({
  state: {
    weathers: JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"),
    error: "",
    weatherInfoDaily: [],
    activeWeather: {},
    currentWeather: {},
    isLoad: false,
  },
  getters: {
    getWeathers(state) {
      return state.weathers
    },
    getError(state) {
      return state.error
    },
    getLoadStatus(state) {
      return state.isLoad
    },
    getWeatherInfoDaily(state) {
      return state.weatherInfoDaily.slice(0, -1)
    },
    getCurrentWeather(state) {
      return state.currentWeather
    },
  },
  mutations: {
    ADD_WEATHER(state, payload) {
      state.weathers.push(payload)

      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.weathers))
    },
    ADD_ERROR(state, payload) {
      state.error = payload
    },
    DELETE_CARD(state, payload) {
      state.weathers = state.weathers.filter(item => item.id !== payload.id)

      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.weathers))
    },
    INIT_WEATHERS(state, payload) {
      state.weathers = payload
    },
    WEATHER_INFO_DAILY(state, payload) {
      state.weatherInfoDaily = payload
    },
    CURRENT_WEATHER(state, payload) {
      state.currentWeather = payload
    },
    ACTIVE_WEATHER(state, payload) {
      state.activeWeather = payload
    },
    IS_LOAD(state, payload) {
      state.isLoad = payload
    },
  },
  actions: {
    async loadWeather({ commit }, payload) {
      try {
        commit("IS_LOAD", true)
        const data = await loadWeather(payload)

        commit("ADD_WEATHER", data)
        commit("IS_LOAD", false)
      } catch (error) {
        if (error.response.data.cod === "404") {
          return commit("ADD_ERROR", "Вы ввели не верный город")
        }
      }
    },
    async loadWeatherInfoDaily({ commit }, payload) {
      try {
        commit("IS_LOAD", true)
        const data = await loadWeatherInfoDaily(payload)

        commit("WEATHER_INFO_DAILY", data.daily)
        commit("CURRENT_WEATHER", data.current)
        commit("IS_LOAD", false)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
