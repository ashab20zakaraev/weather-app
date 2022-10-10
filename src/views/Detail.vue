<template>
  <div>
    <div class="weather">
      <div class="weather__inner">
        <weather-detail-info :currentWeather="currentWeather" />

        <weather-detail-params :currentWeather="currentWeather" />
      </div>
    </div>

    <div class="weather__block weather__block--blue df">
      <weather-detail-hour v-for="item in hourly" :key="item.dt" :item="item" />
    </div>

    <!-- Cards -->
    <weather-detail-list :weatherInfo="weatherInfo" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { formatWeekly, generateURLIcon } from "@/utils/system.js"

import WeatherDetailInfo from "@/components/detail-components/WeatherDeatilInfo"
import WeatherDetailParams from "@/components/detail-components/WeatherDetailParams"
import WeatherDetailList from "@/components/detail-components/WeatherDetailList"
import WeatherDetailHour from "@/components/detail-components/WeatherDetailHour"

export default {
  name: "Detail",
  components: {
    WeatherDetailInfo,
    WeatherDetailParams,
    WeatherDetailList,
    WeatherDetailHour,
  },
  computed: {
    ...mapGetters({
      weatherInfo: "getWeatherInfoDaily",
      currentWeather: "getCurrentWeather",
    }),
    hourly() {
      return this.$store.state.weatherHourlyInfo
    },
  },
  async created() {
    const coord = this.$route.query

    this.$store.dispatch("loadWeatherInfoDaily", coord)
  },

  beforeUnmount() {
    this.$store.commit("CURRENT_WEATHER", {})
    this.$store.commit("WEATHER_INFO_DAILY", [])
  },
  methods: {
    formatDate(dt, options) {
      return formatWeekly(dt, options)
    },
    icon(item) {
      generateURLIcon(item)
    },
  },
}
</script>

<style scoped>
.chart {
  width: 200px;
  height: 180px;
}
</style>
