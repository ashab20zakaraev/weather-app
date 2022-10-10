<template>
  <div>
    <h1 class="weather__title">Добавьте город</h1>

    <ul v-if="!isLoad" class="weather__grid">
      <weather-ticket v-for="item in weathers" :key="item.id" :weather="item" />
    </ul>

    <div v-else class="preloader__block">
      <Preloader />
    </div>
  </div>
</template>

<script>
import WeatherTicket from "@/components/home-components/WeatherTicket"
import Preloader from "@/components/preloader/Preloader"

export default {
  name: "Home",
  components: {
    WeatherTicket,
    Preloader,
  },
  computed: {
    weathers() {
      return this.$store.state.weathers
    },
    isLoad() {
      return this.$store.getters.getLoadStatus
    },
  },
}
</script>
