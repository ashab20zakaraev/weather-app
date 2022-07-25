<template>
  <div>
    <h1 class="weather__title">Добавьте город</h1>

    <ul class="weather__grid">
      <weather-ticket v-for="item in weathers" :key="item.id" :weather="item" />
    </ul>
  </div>
</template>

<script>
import WeatherTicket from "@/components/home-components/WeatherTicket"

export default {
  name: "Home",
  components: {
    WeatherTicket,
  },
  computed: {
    weathers() {
      return this.$store.state.weathers
    },
  },
}
</script>
