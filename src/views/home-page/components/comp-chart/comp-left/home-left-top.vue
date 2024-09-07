<template>
  <div>
    <div class="topInfo">
      <span>{{ pageData.topShowIndicator?.name }}{{ pageData.topShowIndicator?.value }}</span>
      <span>较上期 {{ pageData.topShowIndicator?.compareWithPeriod }}%</span>
    </div>
    <div class="indicator-list">
      <div
        v-for="(rankInfo, index) in pageData.rankInfoList"
        :key="rankInfo.code"
        :class="['indicator-item', 'rank-icon', `rank-${index + 1}`]"
        @click="handleRankInfoClick(rankInfo.code)"
      >
        <div class="rank-label">
          <div class="indicator-name">{{ rankInfo.name }}</div>
          <div class="indicator-percentage">{{ rankInfo.value }}%</div>
        </div>
        <div class="progress-bar">
          <el-progress :percentage="+rankInfo.value" :width="500" :stroke-width="8" :show-text="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch } from "vue";
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

  watch(
    () => store.indicatorAnalysisData,
    newData => {
      setIndicatorAnalysisData(newData);
    }
  );

  function setIndicatorAnalysisData(data: IAnalysisData) {
    // 更新 pageData 的属性
    pageData.indicatorName = data.indicatorName;
    pageData.topShowIndicator = data.topShowIndicator;
    pageData.rankInfoList = data.rankInfoList.sort((a, b) => a.rank - b.rank);
  }
  const handleRankInfoClick = (areaId: string) => {
    store.fetchTreeData(areaId);
    store.fetchLevelData(areaId);
  };
</script>

<style scoped>
  .topInfo {
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .indicator-list {
    color: white;

    .indicator-item {
      padding-left: 50px;

      .rank-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .rank-icon {
    position: relative;
  }

  .rank-icon::before {
    content: "";
    width: 20px;
    height: 23px;
    position: absolute;
    top: 0;
    left: 20px;
    background: url("@/assets/images/left/rank-icon.png") no-repeat center center/100% 100%;
  }

  .rank-1::before {
    content: "1";
    background: url("@/assets/images/left/1.png") no-repeat center center/100% 100%;
  }

  .rank-2::before {
    content: "2";
    background: url("@/assets/images/left/2.png") no-repeat center center/100% 100%;
  }

  .rank-3::before {
    content: "3";
    background: url("@/assets/images/left/3.png") no-repeat center center/100% 100%;
  }
</style>
