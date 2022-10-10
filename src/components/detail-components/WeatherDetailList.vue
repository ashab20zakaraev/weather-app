<template>
  <div class="cards">
    <ul class="cards__list list__cards weather__block">
      <weather-detail-card
        v-for="item in weatherInfo"
        :key="item.dt"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
import WeatherDetailCard from "@/components/detail-components/WeatherDetailCard"

export default {
  name: "Weather Detail List",
  props: {
    weatherInfo: {
      type: Array,
      required: true,
    },
  },
  components: { WeatherDetailCard },
}
</script>

<style></style>
