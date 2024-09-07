<template>
  <my-charts :my-option="option"></my-charts>
</template>

<script setup lang="ts">
let data: number[] = [
  300, 400, 350, 250, 320, 450, 500, 450, 280, 200, 230, 280,
];
let data1: number[] = [
  180, 200, 350, 500, 400, 350, 220, 280, 420, 380, 350, 400,
];

let option = {
  // background: "rgba(0, 0, 0, 0)",
  color: ["#4885B3", "#C7C182"],
  tooltip: {
    trigger: "axis",
    // hover背景色
    backgroundColor: "#282a33",
    // hover时的竖线
    axisPointer: {
      type: "line",
      lineStyle: {
        color: "rgb(126,199,255)",
      },
    },
    // hover时的提示框文字颜色
    textStyle: {
      color: "#00e4ff",
    },
    // 边框发光 根据不同的series设置不同的color
    // extraCssText: "filter:drop-shadow(0 0 .1rem #71d8d9);",
  },
  legend: {
    top: "top",
    icon: "rect",
    show: true,
    itemWidth: 30,
    itemHeight: 4,
    textStyle: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 14,
      padding: [0, 8, 0, 8],
    },
  },
  grid: {
    top: "10%",
    left: "10%",
    right: "8%",
    bottom: "25%",
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        color: "rgba(112, 151, 184, 1)",
        fontSize: 12,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12月"],
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
      axisLabel: {
        show: true,
        color: "rgba(112, 151, 184, 1)",
        fontSize: 14,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#999",
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "本期",
      type: "line",
      showSymbol: false,
      symbol: "none",
      smooth: true,

      lineStyle: {
        width: 1,
        color: "#4885B3",
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
              color: "rgba(82, 140, 183, 0.6)",
            },
            {
              offset: 1,
              color: "rgba(82, 140, 183, 0)",
            },
          ],
          global: false,
        },
      },
      data: data,
    },
    {
      name: "同期",
      type: "line",
      showSymbol: false,
      symbol: "none",
      smooth: true,
      lineStyle: {
        width: 1,
        color: "#C7C182", // 线条颜色
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(204, 186, 156, 0.6)",
            },
            {
              offset: 1,
              color: "rgba(204, 186, 156, 0)",
            },
          ],
          global: false,
        },
      },
      data: data1,
    },
  ],
};
</script>
