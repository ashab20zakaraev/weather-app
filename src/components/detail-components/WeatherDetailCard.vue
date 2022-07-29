<template>
  <li v-if="!isLoad" @click="showHandler" class="list__item item__list">
    <div class="item__name">
      {{ weekday }}
    </div>
    <div class="item__date">
      {{ date }}
    </div>
    <div class="item__img">
      <img :src="icon" alt="" />
    </div>
    <div class="item__name item__max_temp">{{ tempMax }}&deg;</div>
    <div class="item__min_temp">{{ tempMin }}&deg;</div>
    <div class="item__desc">{{ description }}</div>
  </li>
  <div v-else class="list__item item__list placeholder"></div>
</template>

<script>
import { formatWeekly } from "@/utils/system.js"

export default {
  name: "Weather Detail Card",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLoad() {
      return this.$store.getters.getLoadStatus
    },
    icon() {
      return `http://openweathermap.org/img/wn/${this.item.weather[0].icon}@2x.png`
    },
    tempMax() {
      return Math.floor(this.item.temp.max)
    },
    tempMin() {
      return Math.floor(this.item.temp.min)
    },
    description() {
      return this.item.weather[0].description
    },
    weekday() {
      return formatWeekly(this.item.dt, { weekday: "short" })
    },
    date() {
      return formatWeekly(this.item.dt, { day: "2-digit", month: "short" })
    },
  },
  beforeUnmount() {
    this.$store.commit("ACTIVE_WEATHER", {})
  },
  methods: {
    showHandler() {
      this.$store.commit("ACTIVE_WEATHER", this.item)
    },
  },
}
</script>

<style lang="scss" scoped>
.placeholder {
  height: 212px;

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
