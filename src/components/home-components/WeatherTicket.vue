<template>
  <router-link
    :to="{
      name: 'detail',
      params: { id: weather.id },
      query: {
        ...weather.coord,
        city: weather.name,
      },
    }"
    tag="li"
    class="weather__today weather__today--click weather__today--posrelative weather__block"
  >
    <div class="today__header">
      <div class="today__info today__info--intro">
        <span>{{ temp }}&deg;</span>
      </div>

      <div class="today__img today__img--posabsolute">
        <img :src="icon" alt="" />
      </div>
    </div>

    <ul class="today__footer today__footer--intro">
      <li>
        <span class="city__name">{{ weather.name }}</span>
      </li>
    </ul>

    <button
      @click.prevent="delHandler(weather)"
      class="weather-card__del"
      type="button"
    >
      <img src="@/assets/images/icons/close.png" alt="" />
    </button>
  </router-link>
</template>

<script>
import { generateURLIcon } from "@/utils/system.js"

export default {
  name: "Weather Ticket",
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  computed: {
    temp() {
      return Math.floor(this.weather.main.temp)
    },
    icon() {
      return generateURLIcon(this.weather)
    },
  },
  methods: {
    delHandler(item) {
      this.$store.commit("DELETE_CARD", item)
    },
  },
}
</script>
