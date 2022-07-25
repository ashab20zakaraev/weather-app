<template>
  <div v-if="!isLoad" class="weather__today today__weather weather__block">
    <div class="today__header">
      <div class="today__info">
        <span>{{ temp }}&deg;</span>
        <h3>{{ formatDate }}</h3>
      </div>

      <div class="today__img">
        <img :src="icon" alt="" />
      </div>
    </div>

    <ul class="today__footer">
      <li>
        Город: <span class="city__name">{{ cityName }}</span>
      </li>
      <li>
        Описание:
        <span class="city__name">{{ description }}</span>
      </li>
    </ul>
  </div>

  <div
    v-else
    class="weather__today today__weather weather__block placeholder"
  ></div>
</template>

<script>
import { formatWeekly } from "@/utils/system.js"

export default {
  name: "Weather Detail Info",
  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatDate() {
      return formatWeekly(this.currentWeather.dt, { weekday: "long" })
    },
    isLoad() {
      return this.$store.getters.getLoadStatus
    },
    cityName() {
      return this.$route.query.city
    },
    description() {
      return this.currentWeather.weather[0].description
    },
    icon() {
      return `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`
    },
    temp() {
      return Math.floor(this.currentWeather.temp)
    },
  },
}
</script>

<style scoped lang="scss">
.placeholder {
  height: 250px;

  background-color: #bdcbde;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
