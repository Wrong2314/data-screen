<template>
  <div class="nowTime">
  <div class="demo-datetime-picker">
    <div class="block">
      <el-date-picker
        class="date-picker"  
       @change="handleChange"
        v-model="dateInfo"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        date-format="YYYY-MM-DD">
        <template #range-separator>
          ~
        </template>
      </el-date-picker>
    </div>
  </div>
  <div class="current-time">
      {{ currentTime }}
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import dayjs from "dayjs"; 
import 'dayjs/locale/zh-cn';
import { useDateStore } from "@/store/dateStore"; 

const dateInfo = ref(['2024-01-01', '2024-09-09']);
const currentTime = ref(""); // 定义一个响应式变量来存储当前时间
const dateStore = useDateStore();
dayjs.locale('zh-cn'); 
const updateTime = () => {
  currentTime.value = dayjs().format("dddd, YYYY-MM-DD"); 
};
const handleChange = () => {
  const targetArr = dateInfo.value;
  const startTime = targetArr[0];
  const endTime = targetArr[1];
  // 更新Pinia store中的状态
  dateStore.setDates(startTime, endTime);
};
onMounted(() => {
  updateTime(); // 初始化时间
  setInterval(updateTime, 60_000); 
  console.log(dateStore.startDate, dateStore.endDate);
});
</script>

<style lang="scss" scoped>
.demo-datetime-picker {
  display: flex;
  width: 60%;
  padding: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
}
.demo-datetime-picker .block {
  padding: 10px 0;
  text-align: center;
}
.line {
  width: 1px;
  background-color: var(--el-border-color);
}
.nowTime {
  width: 36%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-left: auto;
}
.current-time {
  color: whitesmoke;
  font-size: 16px;
}
</style>
