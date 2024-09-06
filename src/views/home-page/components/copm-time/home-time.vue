<template>
  <div class="nowTime">
    <div>统计时间</div>
    <p class="date">{{ formattedDate }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const weekdays = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

const currentDate = ref(new Date());

const formattedDate = computed(() => {
  const date = currentDate.value;
  return `${weekdays[date.getDay()]}${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
});

setInterval(() => {
  currentDate.value = new Date();
}, 60000);
</script>

<style lang="scss" scoped>
.nowTime {
  position: absolute;
  display: flex;
  right: 100px;
  top: 15px;
  font-size: 16px;

  .date {
    font-size: 20px;
    background-image: linear-gradient(to right, #fe6601, #ff953c, #fc741a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s ease-in-out infinite;
  }

  @keyframes shine {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 100px 0;
    }
  }
}
</style>
