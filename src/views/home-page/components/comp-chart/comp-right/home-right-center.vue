<template>
  <div class="right-center">
    <div v-for="(item, index) in list" :key="index" class="progress-container">
      <el-progress type="circle" :percentage="+item.value" :width="90" :stroke-width="8">
        <template #default>
          <span class="progress-value progress-color">{{ item.value }}</span>
          <span class="progress-unit progress-color">%</span>
        </template>
      </el-progress>

      <div class="progress-desc">
        <div class="progress-color">{{ item.name }}</div>
        <div class="value">
          <span class="value-label">同比</span>
          <span :class="formatValue(item.yoyValue) ? 'up' : 'down'">{{ item.yoyValue }}</span>
          <img :src="formatValue(item.qoqValue) ? up : down" alt="#" />
        </div>
        <div class="value">
          <span class="value-label">环比</span>
          <span :class="formatValue(item.yoyValue) ? 'up' : 'down'">{{ item.qoqValue }}</span>
          <img :src="formatValue(item.qoqValue) ? up : down" alt="#" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, watch } from "vue";
  import { useDataStore } from "@/store/dataStore";
  import axios from "axios";
  import up from "@/assets/images/right/up.png";
  import down from "@/assets/images/right/down.png";

  export interface IBizLineData {
    name: string; //业务条线名称
    value: string; //值
    yoyValue: string; //同比值
    qoqValue: string; //环比值
  }

  const formatValue = (value: string) => {
    return +value > 0;
  };

  const store = useDataStore();
  const startDate = computed(() => store.startDate);
  const endDate = computed(() => store.endDate);

  let list = reactive<IBizLineData[]>([
    {
      name: "刑事", //业务条线名称
      value: "20", //值
      yoyValue: "10", //同比值
      qoqValue: "10", //环比值
    },
    {
      name: "民事", //业务条线名称
      value: "30", //值
      yoyValue: "10", //同比值
      qoqValue: "10", //环比值
    },
    {
      name: "行政", //业务条线名称
      value: "40", //值
      yoyValue: "10", //同比值
      qoqValue: "10", //环比值
    },
    {
      name: "其他", //业务条线名称
      value: "50", //值
      yoyValue: "10", //同比值
      qoqValue: "10", //环比值
    },
  ]);

  const fetchBizLine = async (indicatorId?: string, areaId?: string) => {
    try {
      const { data } = await axios.get("/api/v1/spzx/business_line", {
        params: {
          kssj: startDate.value,
          jssj: endDate.value,
          areaId: areaId,
          indicatorId: indicatorId,
        },
      });
      list = data?.data || [];
    } catch (error) {
      console.error("fetchBizLine failed:", error);
    }
  };

  watch([() => store.activeTreeData, () => store.indicatorAnalysisData], ([activeTreeData, indicatorAnalysisData]) => {
    const { indicatorId } = activeTreeData;
    const areaId = indicatorAnalysisData.topShowIndicator?.code ?? "";
    fetchBizLine(indicatorId, areaId);
  });
</script>

<style scoped lang="scss">
  .right-center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .progress-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 15px);

    .progress-color {
      background: linear-gradient(to bottom, #fff, #56c8ed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .progress-value {
      font-size: 25px;
      color: #ffffff;
    }

    .progress-unit {
      font-size: 12px;
      color: #ffffff;
    }

    .progress-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      padding: 10px 20px;
      position: relative;

      .value-label {
        color: #fff;
      }
    }

    .progress-desc::after {
      content: "";
      position: absolute;
      top: 0;
      left: -30px;
      width: 130%;
      height: 100%;
      z-index: -1;

      background: linear-gradient(
        to bottom,
        rgba(67, 154, 248, 0.2) 0%,
        rgba(67, 154, 248, 0) 5%,
        rgba(67, 154, 248, 0) 95%,
        rgba(67, 154, 248, 0.2) 100%
      );
    }
  }

  .up {
    color: #cf8c46;
  }

  .down {
    color: #03f771;
  }
</style>
