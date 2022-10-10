<template>
  <div class="weather__item">
    <div class="hour">{{ date }}</div>
    <div class="icon">
      <img :src="icon" alt="icon" />
    </div>
    <div class="temp">{{ temp }}&deg;</div>
  </div>
</template>

<script>
import { generateURLIcon, formatWeekly } from "@/utils/system.js"

export default {
  name: "WeatherDetailHour",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    temp() {
      return Math.floor(this.item.temp)
    },
    date() {
      return new Date(this.item.dt * 1000).toLocaleString("ru-RU", {
        hour: "2-digit",
      })
    },
    icon() {
      return generateURLIcon(this.item)
    },
  },
}
</script>

<style lang="scss" scoped>
.temp {
  margin-top: auto;

  font-weight: 500;
  font-size: 1.8rem;
  color: #202020;
}

.hour {
  font-weight: 500;
  font-size: 1.5rem;
  color: #202020;
}

.icon {
  width: 3.5rem;
  height: 2.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>
