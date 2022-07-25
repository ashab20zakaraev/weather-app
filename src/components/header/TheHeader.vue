<template>
  <header class="header">
    <router-link to="/" class="header__logo">
      <div class="header__img">
        <img src="@/assets/images/logo/logo.svg" alt="logo" />
      </div>
      <span>погода</span>
    </router-link>

    <div class="header__actions">
      <button class="btn__theme" @click="themeHandler">
        <img src="@/assets/images/logo/theme.svg" alt="" />
      </button>

      <form class="header__select" @submit.prevent="submitHandler">
        <input
          v-model="header"
          @input="changeInput"
          id="inputCity"
          type="text"
          placeholder="Выбрать город"
          autocomplete="off"
        />
        <label v-if="error" for="inputCity">{{ error }}</label>
      </form>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Header",
  data() {
    return {
      header: "",
    }
  },
  computed: {
    ...mapGetters({
      weathers: "getWeathers",
      error: "getError",
    }),
    isContains() {
      return this.weathers.some(
        item => item.name.toLowerCase() === this.header.toLowerCase()
      )
    },
  },
  methods: {
    async submitHandler() {
      if (this.header === "") return

      if (this.isContains) {
        return this.$store.commit("ADD_ERROR", "Такой город уже добавлен")
      }

      this.$store.dispatch("loadWeather", this.header)
      this.header = ""
    },
    changeInput() {
      this.$store.commit("ADD_ERROR", "")
    },
    themeHandler() {
      console.log("changeTheme")
    },
  },
}
</script>

<style lang="scss">
@import "./header.scss";
</style>
