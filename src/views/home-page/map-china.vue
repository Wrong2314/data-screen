<template>
  <!-- 中国地图 省级 一级页面 -->
  <div id="main"></div>
</template>

<script setup>
import * as echarts from "echarts";
import jsonData from "../../../public/china.json";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

let state = reactive({
  // ename为了获取省份的名字
  dataList: [
    { ename: "nanhaizhudao", name: "南海诸岛" },
    { ename: "beijing", name: "北京" },
    { ename: "tianjin", name: "天津" },
    { ename: "shanghai", name: "上海" },
    { ename: "chongqing", name: "重庆" },
    { ename: "hebei", name: "河北" },
    { ename: "henan", name: "河南" },
    { ename: "yunnan", name: "云南" },
    { ename: "liaoning", name: "辽宁" },
    { ename: "heilongjiang", name: "黑龙江" },
    { ename: "hunan", name: "湖南" },
    { ename: "anhui", name: "安徽" },
    { ename: "shandong", name: "山东" },
    { ename: "xinjiang", name: "新疆" },
    { ename: "jiangsu", name: "江苏" },
    { ename: "zhejiang", name: "浙江" },
    { ename: "jiangxi", name: "江西" },
    { ename: "hubei", name: "湖北" },
    { ename: "guangxi", name: "广西" },
    { ename: "gansu", name: "甘肃" },
    { ename: "jin", name: "山西" },
    { ename: "neimenggu", name: "内蒙古" },
    { ename: "shanxi", name: "陕西" },
    { ename: "jilin", name: "吉林" },
    { ename: "fujian", name: "福建" },
    { ename: "guizhou", name: "贵州" },
    { ename: "guangdong", name: "广东" },
    { ename: "qinghai", name: "青海" },
    { ename: "xizang", name: "西藏" },
    { ename: "sichuan", name: "四川" },
    { ename: "ningxia", name: "宁夏" },
    { ename: "hainan", name: "海南" },
    { ename: "taiwan", name: "台湾" },
    { ename: "xianggang", name: "香港" },
    { ename: "aomen", name: "澳门" },
  ],
});

onMounted(() => {
  let dataList = state.dataList;
  // 模拟数据，给dataList添加一个随机的value值
  for (let i = 0; i < dataList.length; i++) {
    dataList[i].value = Math.floor(Math.random() * 1000 - 1);
  }
  var myChart = echarts.init(document.getElementById("main"));
  // 注册中国地图 第一个参数为地图的名字，第二个参数为地图的json数据，第一个要和geo map一样
  echarts.registerMap("china", jsonData);
  // 配置项
  const option = {
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
      min: 0,
      max: 1000,
      text: ["高", "低"], //两端的文本
      realtime: false,
      calculable: true,
      itemWidth: 20, //图形的宽度，即长条的宽度。
      itemHeight: 90, //图形的高度，即长条的高度。
      align: "auto", //指定组件中手柄和文字的摆放位置.可选值为：‘auto’ 自动决定。‘left’ 手柄和label在右。‘right’ 手柄和label在左。‘top’ 手柄和label在下。‘bottom’ 手柄和label在上。
      left: "left", //组件离容器左侧的距离,‘left’, ‘center’, ‘right’,‘20%’
      top: "60%", //组件离容器上侧的距离,‘top’, ‘middle’, ‘bottom’,‘20%’
      right: "auto", //组件离容器右侧的距离,‘20%’
      bottom: "auto", //组件离容器下侧的距离,‘20%’
      orient: "vertical", //图例排列方向
      inRange: {
        color: ["#141c48", "#0d3d86"],
      },
      //设置字体颜色
      textStyle: {
        color: "#ffffff",
      },
      // 禁止点击分段型视觉映射组件
      selectedMode: false,
    },
    geo: {
      map: "china",
      roam: true, //是否开启平游或缩放
      zoom: 1, //当前视角的缩放比例
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
    // 鼠标悬浮提示框
    series: [
      {
        name: "省份",
        type: "map",
        geoIndex: 0,
        data: dataList,
      },
    ],
  };
  //设置配置项
  myChart.setOption(option);
  // 点击事件地图 enmae为获取省地图的json数据
  // router.push({
  //     path: "/province",
  //     query: { provinceName: "tianjin", province: "天津" },
  //   });
  myChart.on("click", function (params) {
    // console.log("😂👨🏾‍❤️‍👨🏼==>： ", params.data.ename, params.name);  //===>打印后类似 xinjiang 新疆
    router.push({
      path: "/province",
      query: { provinceName: params.data.ename, province: params.name },
    });
  });
  // 缩放适应
  window.addEventListener("resize", () => {
    myChart.resize();
  });
});
</script>

<style scoped>
#main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 1px #1bb4f9);
}
</style>
