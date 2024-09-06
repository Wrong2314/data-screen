<template>
  <!-- 左上角饼图 page -->
  <div id="main-left-top"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

import { onMounted } from "vue";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const mainDom = document.getElementById("main-left-top") as HTMLElement;
  const myChart = echarts.init(mainDom);
  //做环形图的本质是 radius: ['内半径', '外半径'] 内半径!=0
  //画渐变色的原理是：data里面可以设置itemStyle
  let angle = 0; //角度，用来做简单的动画效果的

  // 用TS的方式定义定时器返回值的类型
  let timerId: ReturnType<typeof setInterval>;

  // 修复
  const value = 91;
  const backgroundColor = "transparent";
  const title = {
    text: "修复情况",
    textStyle: {
      color: "#fff",
      fontSize: 23,
    },
    padding: 0,
    top: "8%",
    left: "center",
  };
  const legend = {
    show: false,
  };
  const tooltip = {
    show: false,
  };
  const colors = ["#A098FC", "#4386FA", "#4FADFD", "#0CD3DB", "#646CF9"];
  const innerRingColor = {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [0, 0.3, 0.6, 0.8, 1].map((offset, index) => ({
      offset,
      color: colors[index],
    })),
    global: false, // 缺省为 false
  };
  // 指定图表的配置项和数据
  const option = {
    backgroundColor,
    color: colors,
    title,
    tooltip,
    legend,
    //图表放大
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],

    series: [
      {
        name: "",
        type: "pie",
        center: ["50%", "50%"], //圆心的位置
        radius: ["32%", "35%"], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
        avoidLabelOverlap: false, //做同心圆用到
        clockwise: false, //顺时针排列
        startAngle: 0, //起始角度 影响不大
        label: {
          show: true, //false不显示饼图上的标签
          position: "center", //inside（在饼图上显示）,outside(默认就会出现引导线) center
          formatter: "{d}%",
          fontSize: 25,
          fontWeight: "bold",
        },

        data: [
          {
            value: value,
            name: "完成",
            itemStyle: { color: innerRingColor, opacity: 1 },
          },
          {
            value: 100 - value,
            name: "未完成",
            itemStyle: { color: "#282c40" },
          },
        ].sort((a, b) => b.value - a.value), //数组从大到小排序

        emphasis: {
          scale: false,
        },
      },
      {
        name: "",
        type: "pie",
        center: ["50%", "50%"], //圆心的位置
        radius: ["40%", "50%"], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
        avoidLabelOverlap: false, //做同心圆用到
        clockwise: false, //顺时针排列
        startAngle: 0, //起始角度 影响不大

        label: {
          show: false, //false不显示饼图上的标签
        },

        data: [
          {
            value: value,
            name: "完成",
            itemStyle: { color: innerRingColor, opacity: 1 },
          },
          {
            value: 100 - value,
            name: "未完成",
            itemStyle: { color: "#282c40" },
          },
        ].sort((a, b) => b.value - a.value), //数组从大到小排序

        emphasis: {
          scale: false,
        },
      },
      //colors[0]line
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
              startAngle: ((0 + angle) * Math.PI) / 180,
              endAngle: ((0 + angle) * Math.PI) / 180,
            },
            style: {
              stroke: colors[0],
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5", //        //colors[0]dot
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
          let point = getCirlPoint(x0, y0, r, 0 + angle);
          return {
            type: "circle",
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: colors[0],
              fill: colors[0],
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 蓝色

      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
              startAngle: ((180 + angle) * Math.PI) / 180,
              endAngle: ((270 + angle) * Math.PI) / 180,
            },
            style: {
              stroke: colors[1],
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5", // 蓝色
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
          let point = getCirlPoint(x0, y0, r, 180 + angle);
          return {
            type: "circle",
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: colors[1], //绿
              fill: colors[1],
            },
            silent: true,
          };
        },
        data: [0],
      },

      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
              startAngle: ((270 + -angle) * Math.PI) / 180,
              endAngle: ((40 + -angle) * Math.PI) / 180,
            },
            style: {
              stroke: colors[2],
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      // 橘色

      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
              startAngle: ((0 + -angle) * Math.PI) / 180,
              endAngle: ((220 + -angle) * Math.PI) / 180,
            },
            style: {
              stroke: colors[2],
              fill: "transparent",
              lineWidth: 1.5,
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
          let point = getCirlPoint(x0, y0, r, 0 + -angle);
          return {
            type: "circle",
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: colors[3], //粉
              fill: colors[3],
            },
            silent: true,
          };
        },
        data: [0],
      },
      {
        name: "ring5", //绿点
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (
          params: unknown,
          api: { getWidth: () => number; getHeight: () => number }
        ) {
          let x0 = api.getWidth() / 2;
          let y0 = api.getHeight() / 2;
          let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
          let point = getCirlPoint(x0, y0, r, 270 + -angle);
          return {
            type: "circle",
            shape: {
              cx: point.x,
              cy: point.y,
              r: 4,
            },
            style: {
              stroke: colors[3], //绿
              fill: colors[3],
            },
            silent: true,
          };
        },
        data: [0],
      },
    ],
  };

  //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
  function getCirlPoint(x0: number, y0: number, r: number, angle: number) {
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
    return {
      x: x1,
      y: y1,
    };
  }

  function draw() {
    angle = angle + 3;
    myChart.setOption(option, true);
    // window.requestAnimationFrame(draw);
  }
  draw();
  setTimeout(function () {
    if (timerId) {
      clearInterval(timerId);
    }
    timerId = setInterval(function () {
      //用setInterval做动画感觉有问题
      draw();
    }, 100);
  }, 500);
});
</script>

<style scoped lang="scss">
#main-left-top {
  width: 100%;
  height: 100%;
}
</style>
