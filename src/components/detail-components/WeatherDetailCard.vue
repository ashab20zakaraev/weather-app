<template>
  <li v-if="!isLoad" class="list__item item__list">
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
  <div v-else class="prelodaer__block">
    <Preloader />
  </div>
</template>

<script>
import { formatWeekly, generateURLIcon } from "@/utils/system.js"

import Preloader from "@/components/preloader/Preloader"

export default {
  name: "Weather Detail Card",
  components: { Preloader },
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
      return generateURLIcon(this.item)
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
