<template>
  <div id="left-center"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
// 引入定时器函数
import { useIntervalFn, useIntervalDisposeFn } from "@/utils/startTimer";
let timerId: NodeJS.Timeout;
// 获取当前 以及前7个月份
const getMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const arr = [];
  for (let i = 0; i < 4; i++) {
    if (month - i <= 0) {
      arr.unshift(`${year - 1}-${month - i + 12}`);
    } else {
      arr.unshift(`${year}-${month - i}`);
    }
  }
  return arr;
};

const option = {
  //   title: {
  //       top: '0',
  //       left: 'left',
  //       text: '坐席电话统计',
  //       textStyle: {
  //           align: 'center',
  //           color: '#FFFFFF',
  //           fontSize: 22,
  //       }
  //   },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#282a33", // 背景

    axisPointer: { type: "shadow" },
    textStyle: {
      color: "#00e4ff",
    },
    // 边框发光 根据不同的series设置不同的color
    extraCssText: "filter:drop-shadow(0 0 .1rem #71d8d9);",
  },
  // tooltip: {
  //   show: true,
  //   trigger: "item",
  //   backgroundColor: "#282a33", // 背景
  //   padding: [8, 10], //内边距
  //   // 字体白色
  //   textStyle: {
  //     color: "#00e4ff",
  //   },
  //   // 边框发光 根据不同的series设置不同的color
  //   extraCssText: "filter:drop-shadow(0 0 .1rem #71d8d9);",
  //   // extraCssText: 'filter:drop-shadow(0 0 .1rem #fff);'
  // },
  // grid: {
  //   top: "15%",
  //   right: "50",
  //   bottom: "50",
  //   left: "30",
  // },

  legend: {
    bottom: "2%",
    data: [
      "网络攻击次数",
      "数据泄露次数",
      "安全漏洞数量",
      "鉴别和身份验证",
      "认证和授权",
      "加密",
    ],
    right: "center",
    width: "100%",
    textStyle: {
      color: "#fff",
    },
    itemWidth: 12,
    itemHeight: 10,
  },

  xAxis: [
    {
      type: "category",
      data: getMonth(),
      axisLine: { lineStyle: { color: "#fff" } },
      axisLabel: {
        color: "rgba(255,255,255,.7)",
        fontSize: "14",
      },
    },
  ],

  yAxis: [
    {
      type: "value",
      name: "单位 / K",
      axisTick: { show: false },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 14,
        // 左侧 Y轴文字色
        color: "rgba(255,255,255,.6)",
      },
      axisLine: {
        // 左单位色
        lineStyle: { color: "#fff" },
      },
    },
    {
      type: "value",
      name: "增速",
      show: true,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: "{value} %",
        color: "rgba(255,255,255,.6)",
      },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: "#fff" } }, //右单位色
      splitLine: { show: true, lineStyle: { color: "rgba(255,255,255,.1)" } }, //x轴线
      // min: -12, // 设置最小值为 -12
      // max: 9, // 设置最大值为 9
    },
  ],

  series: [
    {
      name: "网络攻击次数",
      type: "bar",
      data: [12.8, 13.1, 14, 15.3],
      barWidth: "15%",
      itemStyle: {
        borderRadius: 15,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#8bd46e",
          },
          {
            offset: 1,
            color: "#09bcb7",
          },
        ]),
      },
      emphasis: {
        // 鼠标放上发光色
        itemStyle: {
          shadowBlur: 15,
          shadowColor: "#8bd46e",
        },
      },
      barGap: "0.2",
    },
    {
      name: "数据泄露次数",
      type: "bar",
      data: [14.8, 14.1, 15, 16.3],
      barWidth: "15%",
      itemStyle: {
        borderRadius: 15,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#248ff7",
          },
          {
            offset: 1,
            color: "#6851f1",
          },
        ]),
      },
      emphasis: {
        // 鼠标放上发光色
        itemStyle: {
          shadowBlur: 15,
          shadowColor: "#6851f1",
        },
      },
      barGap: "0.2",
    },
    {
      name: "安全漏洞数量",
      type: "bar",
      data: [9.2, 9.1, 9.85, 8.9],
      barWidth: "15%",
      itemStyle: {
        borderRadius: 15,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#fccb05",
          },
          {
            offset: 1,
            color: "#f5804d",
          },
        ]),
      },
      emphasis: {
        // 鼠标放上发光色
        itemStyle: {
          shadowBlur: 15,
          shadowColor: "#f5804d",
        },
      },
      barGap: "0.2",
    },
    {
      name: "鉴别和身份验证",
      type: "line",
      smooth: true,
      yAxisIndex: 1,
      data: [1.48, 0.0, 3, 6],
      lineStyle: {
        width: 2,
      },
      itemStyle: {
        color: "#86d370",
      },
    },
    {
      name: "认证和授权",
      type: "line",
      yAxisIndex: 1,

      data: [8.67, 9.64, 10.61, 11.58],
      lineStyle: {
        width: 2,
      },
      itemStyle: {
        color: "#3496f8",
      },
      smooth: true,
    },
    {
      name: "加密",
      type: "line",
      yAxisIndex: 1,

      data: [-9.64, 10.61, 11.58, 12.55],
      lineStyle: {
        width: 2,
      },
      itemStyle: {
        color: "#fbc30d",
      },
      // 折线平滑
      smooth: true,
    },
  ],
};

onMounted(() => {
  // 使用封装的定时器函数useIntervalFn
  timerId = useIntervalFn("left-center", echarts, option, 6);
});

// 页面离开时销毁echarts实例和监听事件和定时器
onBeforeUnmount(() => useIntervalDisposeFn("left-center", timerId, echarts));
</script>

<style scoped lang="scss">
#left-center {
  width: 100%;
  height: 100%;
}
</style>
