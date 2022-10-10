<template>
  <div class="item">
    <div class="hour">
      {{
        new Date(item.dt * 1000).toLocaleString("ru-RU", {
          hour: "2-digit",
        })
      }}
    </div>
    <div class="icon"></div>
    <div class="temp">{{ Math.floor(item.temp) }}</div>
  </div>
</template>

<script>
export default {
  name: "WeatherDetailHour",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
