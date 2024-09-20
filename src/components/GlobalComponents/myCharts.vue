<template>
  <div :id="uid" :style="myStyle"></div>
</template>

<script setup>
  import { onMounted, onBeforeUnmount, ref, watch } from "vue";
  import * as echarts from "echarts";

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

  // 因为是封装的组件，会多次调用，id不能重复，要在dom挂载之前定义好数据，
  let uid = ref("");
  uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;

  const myChart = ref(null);

  watch(
    () => props.myOption,
    newData => {
      myChart.value.setOption(newData, {
        notMerge: true, //不和之前的option合并
      });
    }
  );

  onMounted(() => {
    if (myChart.value) {
      myChart.value.dispose();
    }
    myChart.value = echarts.init(document.getElementById(uid.value));
    // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
    myChart.value.setOption(props.myOption);

    // 监听页面的大小
    window.addEventListener("resize", () => {
      setTimeout(() => {
        myChart.value?.resize({
          animation: {
            duration: 300,
          },
        });
      }, 300);
    });
  });

  // 页面离开时销毁echarts实例和监听事件和定时器
  onBeforeUnmount(() => {
    window.removeEventListener("resize", () => {});
    myChart.value.dispose();
  });
</script>
