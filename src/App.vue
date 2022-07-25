<template>
  <main class="main">
    <div class="container">
      <the-header />
      <router-view />
    </div>
  </main>
</template>

<script>
import TheHeader from "@/components/header/TheHeader"
import { init } from "@/utils/system.js"

export default {
  name: "Main",
  components: { TheHeader },
  created() {
    init()
  },
}
</script>
