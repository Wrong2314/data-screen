<template>
  <div id="right-top">
    <div class="left">
      <div class="value">
        <span class="value-data value-color">{{ pageData.value }}</span>
        <span class="value-unit">%</span>
      </div>
      <div class="label">{{ activeName }}</div>
      <div class="rank">
        <span class="rank-label">排名</span>
        <span class="rank-value value-color">{{ pageData.rank }}</span>
      </div>
      <div class="desc">
        <span class="desc-label">合理区间：</span>
        <span class="desc-value">{{ pageData.reasonableRange }}</span>
      </div>
    </div>
    <div class="right">
      <div class="flex-item">
        <div class="label">{{ pageData.avgValue?.name }}</div>
        <div class="value">
          <dv-water-level-pond :config="configAvg" class="water" />
        </div>
      </div>
      <div class="flex-item">
        <div class="label">{{ pageData.bestVo?.name }}</div>
        <div class="value">
          <dv-water-level-pond :config="configMax" class="water" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDataStore } from "@/store/dataStore";
  import { computed, reactive, watch } from "vue";

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
  const activeName = computed(() => store.activeTreeData?.name);

  const configAvg = reactive({
    data: computed(() => [pageData.avgValue?.value || 0]), // 假设这是全省平均值
    shape: "round",
    waveNum: 1,
    waveHeight: 10,
    colors: ["#1E90FF", "#87CEFA"],
  });

  const configMax = reactive({
    data: computed(() => [pageData.bestVo?.value || 0]), // 假设这是全省最高值
    shape: "round",
    waveNum: 1,
    waveHeight: 10,
    colors: ["#FFD700", "#FFA500"],
  });

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
    align-items: center;
  }
  .left {
    width: 250px;
    height: 250px;
    background: url(@/assets/images/right/rank.png) no-repeat center center/100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 135px;

    .value-color {
      background: linear-gradient(to bottom, #fff, #ecd237);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .value {
      .value-data {
        margin-left: 20px;
        font-size: 50px;
        line-height: 50px;
      }
      .value-unit {
        font-size: 12px;
      }
    }

    .label {
      font-size: 25px;
      min-height: 25px;
      line-height: 25px;
      margin-top: 15px;
    }

    .rank {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .rank-label {
        font-size: 18px;
      }
      .rank-value {
        font-size: 25px;
        line-height: 25px;
        margin-left: 5px;
        font-weight: 600;
      }
    }

    .desc {
      margin-top: 20px;
      font-weight: 200;
    }
  }

  .right {
    height: 200px;
    margin-left: 40px;
    display: flex;
    flex-direction: column;

    .flex-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      gap: 5px;
    }
    .water {
      width: 90px;
      height: 90px;
    }
  }
</style>
