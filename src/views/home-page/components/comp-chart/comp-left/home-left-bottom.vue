<template>
  <div id="left-bottom"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useIntervalFn, useIntervalDisposeFn } from "@/utils/startTimer";

let timerId: NodeJS.Timeout;

let data: number[] = [12, 45, 87, 78, 12];
let data1: number[] = [88, 12, 45, 87, 65];

let option = {
  //你的代码
  background: "rgba(0, 0, 0, 0)",
  tooltip: {
    trigger: "axis",
    backgroundColor: "#282a33", // 背景
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "rgb(126,199,255)",
      },
    },
    textStyle: {
      color: "#00e4ff",
    },
    // 边框发光 根据不同的series设置不同的color
    extraCssText: "filter:drop-shadow(0 0 .1rem #71d8d9);",
  },
  legend: {
    // 向下居中
    top: "bottom",
    show: true,
    itemWidth: 30,
    itemHeight: 10,
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 14,
      padding: [0, 8, 0, 8],
    },
  },
  grid: {
    top: "10%",
    left: "8%",
    right: "3%",
    bottom: "15%",
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgb(41,188,245)",
        },
      },
      axisLabel: {
        color: "rgba(112, 151, 184, 1)",
        fontSize: 12,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: ["5月", "4月", "3月", "2月", "1月"],
    },
  ],
  yAxis: [
    {
      name: "",
      nameTextStyle: {
        color: "#fff",
        fontSize: 12,
        padding: [0, 60, 0, 0],
      },
      // minInterval: 1,
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: "rgba(112, 151, 184, 1)",
        fontSize: 14,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "警报数量",
      type: "line",
      symbol: "circle",
      smooth: true,
      lineStyle: {
        width: 1,
        color: "#00ffa2", // 线条颜色
      },
      showSymbol: false,
      itemStyle: {
        color: "#00f0ff", //拐点颜色
        label: {
          show: true, //开启显示
          color: "#fff",
          position: "top", //在上方显示
          formatter: function (res: { value: unknown }) {
            if (res.value) {
              return res.value;
            } else {
              return 0;
            }
          },
        },
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            // 渐变颜色
            {
              offset: 0,
              color: "rgba(36, 214, 214, 0.6)",
            },
            {
              offset: 1,
              color: "rgba(36, 214, 214, 0)",
            },
          ],
          global: false,
        },
      },
      data: data,
    },
    {
      name: "非合规告警",
      type: "line",
      showSymbol: false,
      symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
      smooth: true,
      lineStyle: {
        width: 1,
        color: "#3D84F7", // 线条颜色
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            // 渐变颜色
            {
              offset: 0,
              color: "rgba(61, 132, 247, 0.6)",
            },
            {
              offset: 1,
              color: "rgba(61, 132, 247, 0)",
            },
          ],
          global: false,
        },
      },
      data: data1,
    },
  ],
};

onBeforeUnmount(() => useIntervalDisposeFn("left-center", timerId, echarts));

onMounted(() => {
  timerId = useIntervalFn("left-bottom", echarts, option, 6);
});
</script>

<style scoped lang="scss">
#left-bottom {
  width: 100%;
  height: 100%;
}
</style>
