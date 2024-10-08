<template>
  <my-charts :my-option="option"></my-charts>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { useDataStore } from "@/store/dataStore";
  import axios from "axios";

  export interface ITimeLineData {
    name: string; //业务条线名称
    value: string; //值
  }

  const store = useDataStore();
  const startDate = computed(() => store.startDate);
  const endDate = computed(() => store.endDate);

  let option = ref({});
  const seriesData = ref([]);
  const xAxisData = computed(() => seriesData.value?.[0]?.data?.map(item => item?.name));
  const colorStopsList = [
    [
      { offset: 0, color: "rgba(82, 140, 183, 0.6)" },
      { offset: 1, color: "rgba(82, 140, 183, 0)" },
    ],
    [
      { offset: 0, color: "rgba(204, 186, 156, 0.6)" },
      { offset: 1, color: "rgba(204, 186, 156, 0)" },
    ],
  ];

  const fetchTimeLine = async (indicatorId?: string, areaId?: string) => {
    try {
      let { data } = await axios.get("/api/v1/spzx/time_trend", {
        params: {
          kssj: startDate.value,
          jssj: endDate.value,
          areaId,
          indicatorId,
        },
      });

      data = {
        data: [
          {
            name: "本期",
            data: [
              { name: "1月", value: "300" },
              { name: "2月", value: "400" },
              { name: "3月", value: "350" },
              { name: "4月", value: "250" },
              { name: "5月", value: "320" },
              { name: "6月", value: "450" },
              { name: "7月", value: "500" },
              { name: "8月", value: "450" },
              { name: "9月", value: "280" },
              { name: "10月", value: "200" },
              { name: "11月", value: "230" },
              { name: "12月", value: "280" },
            ],
          },
          {
            name: "同期",
            data: [
              { name: "1月", value: "180" },
              { name: "2月", value: "200" },
              { name: "3月", value: "350" },
              { name: "4月", value: "500" },
              { name: "5月", value: "400" },
              { name: "6月", value: "350" },
              { name: "7月", value: "220" },
              { name: "8月", value: "280" },
              { name: "9月", value: "420" },
              { name: "10月", value: "380" },
              { name: "11月", value: "350" },
              { name: "12月", value: "400" },
            ],
          },
        ],
      };

      seriesData.value = (data?.data || []).map((item: any[]) => ({
        ...item,
        seriesData: item.data.map((dataItem: string) => +dataItem.value),
      }));
      setOption();
    } catch (error) {
      console.error("fetchBizLine failed:", error);
    }
  };

  watch([() => store.activeTreeData, () => store.indicatorAnalysisData], ([activeTreeData, indicatorAnalysisData]) => {
    const { indicatorId } = activeTreeData;
    const areaId = indicatorAnalysisData.topShowIndicator?.code ?? "";
    fetchTimeLine(indicatorId, areaId);
  });

  const setOption = () => {
    option.value = {
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
        top: "15%",
        left: "10%",
        right: "8%",
        bottom: "15%",
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
          data: xAxisData,
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
      series: seriesData.value.map((seriesItem: any[], index: number) => ({
        name: seriesItem.name,
        type: "line",
        showSymbol: false,
        symbol: "none",
        smooth: true,
        lineStyle: {
          width: 1,
          color: "#4885B3", //#C7C182
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: colorStopsList[index],
            global: false,
          },
        },
        data: seriesItem.seriesData,
      })),
    };
  };
</script>
