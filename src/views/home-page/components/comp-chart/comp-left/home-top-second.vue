<template>
  <!-- 右上角饼图 page -->
  <div id="main-right-top1"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";

onMounted(() => {
  const myChart = echarts.init(
    document.getElementById("main-right-top1") as HTMLDivElement
  );

  var dataArr = 90;
  var colorSet = "#45CAED";
  var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    {
      offset: 0,
      color: "#8D00FF",
    },
    {
      offset: 0.4,
      color: "#0EBAFC",
    },
    {
      offset: 1,
      color: "#0EBAFC",
    },
  ]);

  const option = {
    backgroundColor: "transparent",
    xAxis: {
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },

    yAxis: {
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },

    // 标题在下方
    title: {
      show: true,
      text: "安全等级评估",
      textStyle: {
        color: "#fff",
        fontSize: 25,
      },
      top: "95",
      left: "center",
    },
    series: [
      // 刻度
      {
        type: "gauge",
        radius: "85%",
        startAngle: 220,
        endAngle: -40,
        axisTick: {
          show: true,
          lineStyle: {
            color: "#6B9DD7",
            width: 1,
          },
          length: -8,
        }, //刻度样式
        splitLine: {
          show: true,
          lineStyle: {
            color: "#6B9DD7",
            width: 1,
          },
          length: -8,
        }, //分隔线样式
        axisLabel: {
          color: "rgba(255,255,255,0)",
          fontSize: 12,
        }, //刻度节点文字颜色
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        label: {
          show: false,
        },
        //仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: [0, "85%"],
          color: "#ACCFFF",
          formatter: function () {
            return "安全等级评估";
          },
          fontSize: 16,
        },
      },
      {
        name: "内部进度条",
        type: "gauge",
        center: ["50%", "50%"],
        radius: "85%",
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: [
              [dataArr / 100, color],
              [1, "rgba(107,157,215,.25)"],
            ],
            width: 8,
          },
        },
        z: 4,
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        itemStyle: {
          color: colorSet,
        },
        detail: {
          show: false,
        },
        label: {
          show: false,
        },

        title: {
          //标题
          show: true,
          offsetCenter: [0, "35%"],
          color: "#ACCFFF",
          fontSize: 50, //表盘上的标题文字大小
          fontWeight: 400,
          fontFamily: "PingFangSC",
        },
        data: [
          {
            name: dataArr + "%",
            value: dataArr,
          },
        ],
        pointer: {
          show: true,
          length: "40%",
          radius: "20%",
          width: 4, //指针粗细
        },
      },
      {
        //指针上的圆
        type: "pie",
        tooltip: {
          show: false,
        },
        z: 5,
        emphasis: {
          scale: false,
        },
        legendHoverLink: false,
        radius: ["0%", "6%"],
        // center: ["50%", "50%"],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 10,
            itemStyle: {
              color: colorSet,
            },
          },
        ],
      },
      // 外一层圈
      {
        type: "pie",
        radius: "100%",
        startAngle: 220,
        endAngle: -40,
        emphasis: {
          scale: false,
        },
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 1,
          },
        ],
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#17A1FF",
              },
              {
                offset: 1,
                color: "rgba(17, 90, 233, 0.16)",
              },
            ],
          },
          opacity: 0.12,
        },
      },
      // 内圆
      {
        type: "pie",
        radius: ["0", "50%"],
        center: ["50%", "50%"],
        emphasis: {
          scale: false,
        },
        z: 3,
        data: [
          {
            value: dataArr,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#23A6FF",
                },
                {
                  offset: 1,
                  color: "rgba(17, 90, 233, 0.21)  ",
                },
              ]),
              opacity: 0.59,
            },
            label: {
              show: false,
            },
          },
        ],
        labelLine: {
          show: false,
        },
      },
    ],
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart?.setOption(option);
});
</script>

<style scoped lang="scss">
#main-right-top1 {
  width: 100%;
  height: 100%;
}
</style>
