<template>
  <div>
    <div class="weather">
      <div class="weather__inner">
        <weather-detail-info :currentWeather="currentWeather" />

        <weather-detail-params :currentWeather="currentWeather" />
      </div>
    </div>

    <!-- Cards -->
    <weather-detail-list :weatherInfo="weatherInfo" />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { formatWeekly } from "@/utils/system.js"

import WeatherDetailInfo from "@/components/detail-components/WeatherDeatilInfo"
import WeatherDetailParams from "@/components/detail-components/WeatherDetailParams"
import WeatherDetailList from "@/components/detail-components/WeatherDetailList"

export default {
  name: "Detail",
  components: { WeatherDetailInfo, WeatherDetailParams, WeatherDetailList },
  computed: {
    ...mapGetters({
      weatherInfo: "getWeatherInfoDaily",
      currentWeather: "getCurrentWeather",
    }),
  },
  async created() {
    const coord = this.$route.query

    this.$store.dispatch("loadWeatherInfoDaily", coord)
  },
  methods: {
    formatDate(dt, options) {
      return formatWeekly(dt, options)
    },
  },
}
</script>
