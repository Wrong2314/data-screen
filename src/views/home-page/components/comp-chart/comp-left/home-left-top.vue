<template>
  <div id="left-top">
    <div class="topInfo">
      <div class="value-container">
        <span class="label">{{ pageData.topShowIndicator?.name }}</span>
        <span class="value">{{ pageData.topShowIndicator?.value }}</span>
      </div>
      <div class="value-container">
        <span class="label">较上期</span>
        <img :src="formatValue(pageData.topShowIndicator?.compareWithPeriod) ? up : down" alt="#" class="img" />
        <span :class="['percent', formatValue(pageData.topShowIndicator?.compareWithPeriod) ? 'up' : 'down']">
          {{ pageData.topShowIndicator?.compareWithPeriod }}
        </span>
      </div>
    </div>
    <div class="indicator-list">
      <div
        v-for="(rankInfo, index) in pageData.rankInfoList"
        :key="rankInfo.code"
        :class="['indicator-item', 'rank-icon', `rank-${index + 1}`, 'active']"
        :data-rank="index + 1"
        @click="handleRankInfoClick(rankInfo.code)"
      >
        <div class="rank-label">
          <div class="indicator-name">{{ rankInfo.name }}</div>
          <div class="indicator-percentage">{{ rankInfo.value }}%</div>
        </div>
        <div class="progress-bar">
          <el-progress
            :percentage="+rankInfo.value"
            :color="customColorMethod(index + 1)"
            :stroke-width="12"
            :show-text="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch } from "vue";
  import { useDataStore } from "@/store/dataStore";
  import up from "@/assets/images/right/up.png";
  import down from "@/assets/images/right/down.png";

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

  const formatValue = (val: string) => {
    const numberString = val?.replace("%", "");
    return parseFloat(numberString) > 0;
  };

  const customColorMethod = (index: number) => {
    switch (index) {
      case 1:
        return "linear-gradient(to right, #CB3736, #E58151)";
      case 2:
        return "linear-gradient(to right, #CFB459, #E1C63D)";
      case 3:
        return "linear-gradient(to right, #06E2AA, #00C3A4)";
      default:
        return "linear-gradient(to right, #0C53AC, #19BDD2)";
    }
  };

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
    line-height: 50px;
    margin: 13px 0;
    background: url("@/assets/images/left/bg-label.png") no-repeat center center/100% 100%;

    .value-container {
      display: flex;
      align-items: center;
      .label {
        color: #999;
      }

      .img {
        margin: 0 5px;
      }

      .value {
        margin-left: 5px;
        font-size: 22px;
        font-weight: 700;
        background: linear-gradient(to bottom, #fff, #ecd237);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }
    }

    .up {
      color: #cf8c46;
    }

    .down {
      color: #03f771;
    }
  }

  .indicator-list {
    color: white;
    max-height: 540px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* 隐藏滚动条，保留滚动功能 */

    ::-webkit-scrollbar {
      display: none;
    }

    .indicator-item {
      margin-left: 30px;
      padding-left: 45px;
      padding-right: 30px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .rank-label {
      height: 20px;
      line-height: 20px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .rank-icon {
      position: relative;
    }

    .rank-icon::before {
      content: attr(data-rank);
      width: 20px;
      height: 23px;
      line-height: 23px;
      position: absolute;
      top: 12px;
      left: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("@/assets/images/left/rank-icon.png");
    }

    .rank-1::before {
      background-image: url("@/assets/images/left/1.png");
    }

    .rank-2::before {
      background-image: url("@/assets/images/left/2.png");
    }

    .rank-3::before {
      background-image: url("@/assets/images/left/3.png");
    }

    .active {
      background: url("@/assets/images/left/active.png") no-repeat center center/100% 100%;
    }
  }

  :deep(.el-progress-bar__outer) {
    background-color: #1c356e;
    border-radius: 0;
  }

  :deep(.el-progress-bar__inner) {
    border-radius: 0;
  }
</style>
