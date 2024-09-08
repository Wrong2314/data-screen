<template>
  <div :id="uid" :style="myStyle"></div>
</template>

<script setup lang="ts">
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
  let uid = ref<string>("");
  uid.value = `echarts-uid-${parseInt((Math.random() * 1000000).toString())}`;

  const myChart = ref<any>(null);

  watch(
    () => props.myOption,
    newData => {
      myChart.value.setOption(newData, {
        notMerge: true, //不和之前的option合并
      });
    }
  );

  onMounted(() => {
    myChart.value = echarts.init(document.getElementById(uid.value) as HTMLElement);
    // 在template中可以直接取props中的值，但是在script中不行，因为script是在挂载之前执行的
    myChart.value.setOption(props.myOption, {
      notMerge: true, //不和之前的option合并
    });

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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.removeEventListener("resize", () => {});
    echarts.dispose(document.getElementById(uid.value) as HTMLElement);
  });
</script>
