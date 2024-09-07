<template>
  <div>
    <div class="topInfo">
      <span>{{ pageData.topShowIndicator?.name }}{{ pageData.topShowIndicator?.value }}</span>
      <span>较上期 {{ pageData.topShowIndicator?.compareWithPeriod }}%</span>
    </div>
    <div class="indicator-list">
      <div v-for="rankInfo in pageData.rankInfoList" :key="rankInfo.code" class="indicator-item" @click="handleRankInfoClick(rankInfo.code)">
        <div class="indicator-name">{{ rankInfo.name }}</div>
        <div class="indicator-percentage">{{ rankInfo.value }}%</div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: rankInfo.value + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from "vue";
  import { useDataStore } from "@/store/dataStore";
  export interface IAnalysisData {
    indicatorName: string;
    topShowIndicator: ITopShowIndicator | null;
    rankInfoList: IRankInfo[];
  }
  export interface ITopShowIndicator {
    name: string;
    code: string;
    value: string;
    compareWithPeriod: string;
    trend: string;
  }
  export interface IRankInfo {
    rank: number;
    code: string;
    name: string;
    value: string;
    canSelected: boolean;
  }
  let pageData = reactive<IAnalysisData>({
    indicatorName: "",
    topShowIndicator: null,
    rankInfoList: [],
  });
  const store = useDataStore();

  function fetchIndicatorAnalysisData() {
    const data = store.indicatorAnalysisData; // 从 Pinia store 获取数据
    // 更新 pageData 的属性
    pageData.indicatorName = data.indicatorName;
    pageData.topShowIndicator = data.topShowIndicator;
    pageData.rankInfoList = data.rankInfoList.sort((a, b) => a.rank - b.rank);
  }
  const handleRankInfoClick = (areaId: string) => {
    store.fetchTreeData(areaId);
  };
  onMounted(() => {
    fetchIndicatorAnalysisData();
  });
</script>

<style scoped>
  .topInfo {
    color: white;
  }
  .indicator-list {
    color: white;
  }
</style>
