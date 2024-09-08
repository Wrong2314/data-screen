<template>
  <div id="right-top">
    <home-right-first />
    <home-right-second />
  </div>
</template>

<script setup lang="ts">
  import HomeRightFirst from "@/views/home-page/components/comp-chart/comp-right/home-right-first.vue";
  import HomeRightSecond from "@/views/home-page/components/comp-chart/comp-right/home-right-second.vue";
  import { useDataStore } from "@/store/dataStore";
  import { reactive, watch } from "vue";

  export interface IDetailData {
    indicatorName: string; //指标名称
    value: string; //指标值 最多小数点后4位
    rank: string; //排名 最多2位
    reasonableRange: string; //合理区间
    avgValue: {
      name: string; //名称
      value: string; //值
    }; //XX平均值
    bestVo: {
      name: string; //名称
      value: string; //值
    };
  }

  let pageData = reactive<IDetailData>({
    indicatorName: "", //指标名称
    value: "", //指标值 最多小数点后4位
    rank: "", //排名 最多2位
    reasonableRange: "", //合理区间
    avgValue: {
      name: "", //名称
      value: "", //值
    }, //XX平均值
    bestVo: {
      name: "", //名称
      value: "", //值
    },
  });
  const store = useDataStore();
  watch(
    () => store.activeTreeData,
    newData => {
      const { indicatorId } = newData;
      const areaId = store.indicatorAnalysisData.topShowIndicator?.code ?? "";
      store.fetchDetailData(indicatorId, areaId);
    }
  );
  watch(
    () => store.indicatorAnalysisData,
    newData => {
      const areaId = newData.topShowIndicator?.code ?? "";
      const { indicatorId } = store.activeTreeData;
      store.fetchDetailData(indicatorId, areaId);
    }
  );
  watch(
    () => store.indicatorDetailData,
    newData => {
      setDetailData(newData);
    }
  );

  function setDetailData(data: IDetailData) {
    pageData.value = data.value;
    pageData.reasonableRange = data.reasonableRange;
    pageData.rank = data.rank;
    pageData.indicatorName = data.indicatorName;
    pageData.bestVo = data.bestVo;
    pageData.avgValue = data.avgValue;
  }

  //todo:数据转换
</script>

<style lang="scss" scoped>
  #right-top {
    width: 100%;
    height: 100%;
    color: #ffffff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
</style>
