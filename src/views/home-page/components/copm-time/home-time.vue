<template>
  <div class="nowTime">
    <i class="iconfont icon-weibiaoti-"></i>
    <p class="date">{{ currentDate }}</p>
    <p class="time">&nbsp;{{ currentTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const currentTime = ref<string>("");
const currentDate = ref<string>("");

const updateTime = () => {
  const date = new Date();
  currentTime.value = date.toLocaleTimeString();
  currentDate.value = `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日 ${
    ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()]
  }`;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style lang="scss" scoped>
@import url("@/assets/iconFont/iconfont.css");
.icon-weibiaoti- {
  font-size: 30px;
  color: #0585e8;
  margin-right: 10px;
}
.nowTime {
  position: absolute;
  display: flex;
  right: 100px;
  top: 15px;
  font-size: 16px;

  .time,
  .date {
    font-size: 26px;
    background-image: linear-gradient(to right, #d38328, #bd5717, #807568);
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

  .date {
    font-size: 20px;
    background-image: linear-gradient(to right, #fe6601, #ff953c, #fc741a);
  }
}
</style>
