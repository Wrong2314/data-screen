<template>
  <!-- 中国地图 展示市 二级页面 接受来自省点击的ename，渲染不同省json-->
  <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>

  <!-- echarts 容器 -->
  <div :id="state.id" class="provinceCharts"></div>
</template>

<script setup>
import * as echarts from "echarts";

import axios from "axios";

import { onMounted, reactive } from "vue";

// useRoute() 用于获取当前路由信息（路由实例对象） useRouter() 路由跳转对象
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// 定义echarts的数据
let state = reactive({
  id: "echarts_" + new Date().getTime() + Math.floor(Math.random() * 1000),
  myChart: null,
  option: {
    // 背景颜色
    // backgroundColor: "#0b1938",
    title: {
      text: "",
      top: "10%",
      left: "8%",
      textStyle: {
        fontSize: 24,
        fontWeight: 300,
        color: "#fff",
      },
    },
    // 提示浮窗样式
    tooltip: {
      show: true,
      trigger: "item",
      alwaysShowContent: false,
      backgroundColor: "#0C121C",
      borderColor: "rgba(0, 0, 0, 0.16);",
      hideDelay: 100,
      triggerOn: "mousemove",
      enterable: true,
      formatter: "",
      textStyle: {
        color: "#DADADA",
        fontSize: "12",
        width: 20,
        height: 30,
        overflow: "break",
      },
      showDelay: 100,
    },

    visualMap: {
      //分段型视觉映射组件
      show: true,
      type: "piecewise",
      left: 50,
      bottom: 50,
      showLabel: true,
      itemWidth: 10,
      itemHeight: 10,
      inverse: true,
      //设置字体颜色
      textStyle: {
        color: "#ffffff",
      },
      pieces: [
        {
          lt: 5,
          label: " < 5",
          color: "#83CBAC",
        },
        {
          gte: 5,
          lte: 10,
          label: "5 - 10",
          color: "#55BB8A",
        },
        {
          gt: 10,
          lte: 15,
          label: "10 - 15",
          color: "#20A162",
        },
        {
          gt: 15,
          lte: 20,
          label: "15 - 20",
          color: "#9ABEFA",
        },
        {
          gt: 20,
          lte: 30,
          label: "20 - 30",
          color: "#78A9F9",
        },
        {
          gt: 30,
          label: "> 30",
          color: "#5693F7",
        },
      ],
      // 禁止点击分段型视觉映射组件
      selectedMode: false,
    },

    // 地图配置
    geo: {
      map: "", //会从点击的省份的ename中获取
      roam: true, //是否开启平游或缩放
      zoom: 0.9, //当前视角的缩放比例
      emphasis: {
        label: {
          color: "#fff",
        },
        // 鼠标放上高亮样式
        itemStyle: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
      label: {
        // 通常状态下的样式
        show: true,
        color: "#fff",
        // 鼠标放上去的样式
      },
      // 地图区域的样式设置
      itemStyle: {
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
            },
          ],
          globalCoord: false,
        },
        shadowColor: "rgba(128, 217, 248, 1)",
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
    },

    series: [
      {
        name: "市级",
        type: "map",
        geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
        data: [{ name: "", value: "" }],
      },
    ],
  },
});

onMounted(async () => {
  /*  接受来自china.vue的参数:
     console.log(route.query);  打印后====》 { "provinceName": "xinjiang", "province": "新疆" } */
  const provinceName = route.query.provinceName;
  const province = route.query.province;

  // 设置地图标题
  state.option.title.text = province;
  // 设置地图
  state.option.geo.map = province;
  // 初始化echarts
  state.myChart = echarts.init(document.getElementById(state.id));
  // 根据china.vue点击的省份，传过来的名称（china定义的ename）获取数据（不同json）！！！ 重要
  // 这里是第一种方式，通过上级定义的ename获取数据
  // city.vue中是第二种方式，通过单独的js文件的键值对的key获取对应的json
  await axios.get(`/public/province/${provinceName}.json`).then((res) => {
    /* 
    地图注册 第一个参数是地图名称，第二个参数是地图json数据，第一参数要和goe.map的值一样
  （这里注册的地图和goe.map 是接受china点击的ename 都是动态赋值）  
  */
    echarts.registerMap(province, res.data);
    // 模拟数据 series
    res.data.features.forEach((item) => {
      // series是数组里面data是一个对象，所以要用series[0].data.push
      state.option.series[0].data.push({
        name: item.properties.name,
        value: Math.round(Math.random() * 100),
      });
    });
    // 将定义的数据设置进myChart （myChary 是初始化echarts）
    state.myChart.setOption(state.option);
  });

  // 点击市数据跳转到区县数据
  state.myChart.on("click", (params) => {
    router.push({
      path: "/city",
      query: { city: params.name },
    });
  });
  // echarts适应屏幕大小
  window.addEventListener("resize", () => {
    // eslint-disable-next-line no-undef
    state.myChart.resize();
    state.myChart.setOption(state.option);
  });
});
</script>
<style scoped>
@import url("@/assets/iconFont/iconfont.css");

.provinceCharts {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /* border: 1px solid #fff; */
}
</style>
