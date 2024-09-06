<template>
  <!-- 左下角折线图 page -->
  <div id="right-top"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount } from "vue";
onMounted(() => {
  const mainDom = document.getElementById("right-top") as HTMLElement;
  const myChart = echarts.init(mainDom);
  // 左上侧雷达图数据
  const legendData = ["系统监控", "网络攻击防御", "数据加密与解密"]; //图例

  const indicator = [
    {
      name: "数据传输安全性",
      // max: 30,
    },
    {
      name: "反制能力",
      // max: 30
    },
    {
      name: "数据解密技术",
      // max: 30
    },
    {
      name: "数据加密技术",
      // max: 30,
      //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
    },
    {
      name: "基础监控",
      // max: 30
    },
    {
      name: "攻击检测能力",
      // max: 30
    },
  ];

  const dataArr = [
    /* 系统监控 */
    {
      // 模拟数据 数组中六个值分别代表六个指标的值
      value: [10, 20, 30, 40, 50, 60],
      name: legendData[0],
      itemStyle: {
        lineStyle: {
          color: "#4A99FF",
          shadowColor: "#4A99FF",
          shadowBlur: 10,
        },
        shadowColor: "#4A99FF",
        shadowBlur: 10,
      },
      areaStyle: {
        // 单项区域填充样式
        color: {
          type: "linear",
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: "#4A99FF",
            },
            {
              offset: 0.5,
              color: "rgba(0,0,0,0)",
            },
            {
              offset: 1,
              color: "#4A99FF",
            },
          ],
          globalCoord: false,
        },
        opacity: 1, // 区域透明度
      },
    },
    /* 网络攻击防御 */
    {
      value: [6, 11, 15, 14, 20, 16],
      name: legendData[1],
      itemStyle: {
        lineStyle: {
          color: "#4BFFFC",
          // shadowColor: '#4BFFFC',
          // shadowBlur: 10,
        },
        shadowColor: "#4BFFFC",
        shadowBlur: 10,
      },
      areaStyle: {
        // 单项区域填充样式
        color: {
          type: "linear",
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: "#4BFFFC",
            },
            {
              offset: 0.5,
              color: "rgba(0,0,0,0)",
            },
            {
              offset: 1,
              color: "#4BFFFC",
            },
          ],
          globalCoord: false,
        },
        opacity: 1, // 区域透明度
      },
    },
    // 数据加密与解密
    {
      value: [16, 10, 5, 4, 9, 30],
      name: legendData[2],
      itemStyle: {
        lineStyle: {
          color: "#8793fb",
        },
        shadowColor: "#8793fb",
        shadowBlur: 10,
      },
      areaStyle: {
        // 单项区域填充样式
        color: {
          type: "linear",
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: "#8793fb",
            },
            {
              offset: 0.5,
              color: "rgba(0,0,0,0)",
            },
            {
              offset: 1,
              color: "#8793fb",
            },
          ],
          globalCoord: false,
        },
        opacity: 1, // 区域透明度
      },
    },
  ];

  const colorArr = ["#4A99FF", "#f8923f", "#43badc"]; //雷达边框颜色

  const option = {
    backgroundColor: "transparent",
    // title: {
    //     top: 'top',
    //     left: 'left',
    //     text: '坐席电话统计',
    //     textStyle: {
    //         align: 'center',
    //         color: '#FFFFFF',
    //         fontSize: 22,
    //     }
    // },
    color: colorArr,
    legend: {
      orient: "vertical",
      icon: "circle", //图例形状
      data: legendData,
      bottom: 10,
      right: 0,
      // itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
      // itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
      itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: "#00E4FF",
      },
    },
    tooltip: {
      show: true,
      trigger: "item",
      backgroundColor: "#282a33", // 背景
      padding: [8, 10], //内边距
      // 字体白色
      textStyle: {
        color: "#00e4ff",
      },
      // 边框发光 根据不同的series设置不同的color
      extraCssText: "filter:drop-shadow(0 0 .1rem #71d8d9);",
      // extraCssText: 'filter:drop-shadow(0 0 .1rem #fff);'
    },
    // 图表靠左侧
    grid: {
      left: "10",
    },
    radar: {
      // shape: 'circle',
      axisName: {
        color: "#fff",
        fontSize: 16,
      },
      indicator: indicator,
      splitArea: {
        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
        show: true,
        areaStyle: {
          // 分隔区域的样式设置。
          color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
        },
      },
      axisLine: {
        //指向外圈文本的分隔线样式
        lineStyle: {
          color: "#153269",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#113865", // 分隔线颜色
          width: 1, // 分隔线线宽
        },
      },
    },
    series: [
      {
        type: "radar",
        symbolSize: 8,
        data: dataArr,
      },
    ],
  };

  myChart.setOption(option);
  let timer: ReturnType<typeof setInterval>;

  timer = setInterval(function () {
    // 每过3秒设置一次 dataArr[i].value 六个数据随机值
    for (let i = 0; i < dataArr.length; i++) {
      dataArr[i].value = [];
      for (let j = 0; j < indicator.length; j++) {
        dataArr[i].value.push(Math.floor(Math.random() * 5));
      }
    }
    myChart.setOption(option);
  }, 3000);

  // 窗口变化时，重置图表大小
  window.addEventListener("resize", function () {
    myChart.resize();
  });

  // 卸载组件之前，清除定时器
  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
});
</script>

<style scoped>
#right-top {
  width: 100%;
  height: 100%;
}
</style>
