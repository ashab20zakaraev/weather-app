<template>
  <div v-if="!isLoad" class="weather__detail detail__weather weather__block">
    <ul class="detail__list">
      <li class="detail__item">
        <div class="detail__img">
          <img src="@/assets/images/icons/1.svg" alt="" />
        </div>
        <h3 class="detail__name">Температура</h3>
        <h2 class="detail__info">
          {{ temp }}° - ощущается как {{ feelLike }}°
        </h2>
      </li>

      <li class="detail__item">
        <div class="detail__img">
          <img src="@/assets/images/icons/2.svg" alt="" />
        </div>
        <h3 class="detail__name">Давление</h3>
        <h2 class="detail__info">{{ pressure }} мм ртутного столба</h2>
      </li>

      <li class="detail__item">
        <div class="detail__img">
          <img src="@/assets/images/icons/3.svg" alt="" />
        </div>
        <h3 class="detail__name">Влажность</h3>
        <h2 class="detail__info">{{ humidity }}%</h2>
      </li>

      <li class="detail__item">
        <div class="detail__img">
          <img src="@/assets/images/icons/4.svg" alt="" />
        </div>
        <h3 class="detail__name">Ветер</h3>
        <h2 class="detail__info">{{ windSpeed }} м/с</h2>
      </li>
    </ul>
  </div>

  <div
    v-else
    class="weather__detail detail__weather weather__block placeholder"
  ></div>
</template>

<script>
export default {
  name: "WeatherDetailParams",
  props: {
    currentWeather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLoad() {
      return this.$store.getters.getLoadStatus
    },
    temp() {
      return Math.floor(this.currentWeather.temp)
    },
    feelLike() {
      return Math.floor(this.currentWeather.feels_like)
    },
    pressure() {
      return Math.floor(this.currentWeather.pressure / 1.333)
    },
    humidity() {
      return this.currentWeather.humidity
    },
    windSpeed() {
      return this.currentWeather.wind_speed.toFixed(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.placeholder {
  height: 250px;

  background-color: #bdcbde;
  animation: pulse 2s infinite;

  transition: all 0.2s linear;
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
