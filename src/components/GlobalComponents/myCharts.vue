<template>
  <div :id="uid" :style="myStyle"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as echarts from "echarts";
// 因为是封装的组件，会多次调用，id不能重复，要在dom挂载之前定义好数据，
let uid = ref<string>("");
uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;
onMounted(() => {
  let myChart = echarts.init(document.getElementById(uid.value) as HTMLElement);
  // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
  myChart.setOption(props.myOption, {
    notMerge: true, //不和之前的option合并
  });

  // 监听页面的大小
  window.addEventListener("resize", () => {
    setTimeout(() => {
      myChart?.resize({
        animation: {
          duration: 300,
        },
      });
    }, 300);
  });
});

// 暴露给父组件的方法,方便子组件写随机数据时调用渲染图表的方法
// defineExpose({
//   // 重新渲染
//   reRender() {
//     // 销毁实例在创建
//     // echarts.dispose(document.getElementById(uid.value) as HTMLElement);
//     let myChart = echarts.init(
//       document.getElementById(uid.value) as HTMLElement
//     );
//     myChart.setOption(props.myOption, {
//       notMerge: true, //不和之前的option合并
//     });
//   },
//   // 在父页面使用步骤
//   // <my-charts ref="sonChart" :myOption="myOption" :myStyle="myStyle" />
//   // let sonChart = ref();
//   // sonChart.value.reRender();
// });

// 页面离开时销毁echarts实例和监听事件和定时器
onBeforeUnmount(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.removeEventListener("resize", () => {});
  echarts.dispose(document.getElementById(uid.value) as HTMLElement);
});
const props = defineProps({
  myStyle: {
    type: Object,
    default: () => ({
      width: "100%",
      height: "100%",
    }),
  },
  myOption: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});
</script>
