<template>
  <div class="indicator-container">
    <div class="indicator-display">
      <div class="row" v-for="(row, index) in displayedRows" :key="index">
        <!-- 添加点击事件监听 -->
        <div class="indicator" v-for="indicator in row" :key="indicator.indicatorId" @click="handleIndicatorClick(indicator)">{{ indicator.name }} {{ indicator.value }}</div>
      </div>
    </div>
    <div class="pagination-controls">
      <el-button @click="prevPage">←</el-button>
      <el-button @click="nextPage">→</el-button>
    </div>
    <div class="indicator-zoom">
      <div v-if="pageData.activeIndicator">{{ pageData.activeIndicator.name }} {{ pageData.activeIndicator }}</div>
      <div v-else-if="pageData.indicators.length > 0">{{ pageData.indicators[0].name }}{{ pageData.indicators[0].value }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useDataStore } from "@/store/dataStore";
  import { reactive, computed, watch } from "vue";

  export interface IData {
    indicatorId: string;
    name: string;
    value: number;
  }
  export interface IPageData {
    indicators: IData[];
    activeIndicator: IData | null;
    currentPage: number;
    pageSize: number;
    highLightTreeDataArr: IData[];
  }
  const pageData = reactive<IPageData>({
    indicators: [], // 存储指标数据
    activeIndicator: null, //当前选中的指标
    currentPage: 0, // 当前页码
    pageSize: 16, // 每页显示的指标数（8行，每行2个）
    highLightTreeDataArr: [],
  });
  const store = useDataStore();
  //更新当前treeData指标
  watch(
    () => store.treeData,
    newData => {
      fetchIndicators(newData);
    }
  );

  //更新当前treeData需要高亮的指标
  watch(
    () => store.highLightTreeDataIdArr,
    newData => {
      pageData.highLightTreeDataArr = [];
      // 遍历新的高亮指标ID数组
      newData.forEach(id => {
        // 在所有指标中查找匹配的指标ID
        const foundIndicator = pageData.indicators.find(indicator => indicator.indicatorId === id);
        // 如果找到了匹配的指标，将其添加到高亮指标数组中
        if (foundIndicator) {
          pageData.highLightTreeDataArr.push(foundIndicator);
        }
      });
      console.log("highLightTreeDataArr", pageData.highLightTreeDataArr);
    }
  );

  // 使用computed创建计算属性
  const displayedRows = computed(() => {
    const start = pageData.currentPage * pageData.pageSize;
    const end = start + pageData.pageSize;
    const pageIndicators = pageData.indicators.slice(start, end);
    let rows = [];
    for (let i = 0; i < pageIndicators.length; i += 2) {
      rows.push(pageIndicators.slice(i, i + 2));
    }
    return rows;
  });

  function fetchIndicators(data: IData[]) {
    // 假设 treeData 的结构与之前的 mockData 类似
    pageData.indicators = data; // 从 Pinia store 的 treeData 获取数据并赋值
  }

  // 上一页
  function prevPage() {
    if (pageData.currentPage > 0) {
      pageData.currentPage--;
    }
  }

  // 下一页
  function nextPage() {
    if ((pageData.currentPage + 1) * pageData.pageSize < pageData.indicators.length) {
      pageData.currentPage++;
    }
  }

  //指标选中
  function selectIndicator(indicator: IData) {
    pageData.activeIndicator = indicator;
  }
  // 点击指标项时的处理函数
  function handleIndicatorClick(indicator: IData) {
    selectIndicator(indicator); // 设置当前选中的指标项
    store.setActiveTreeData(indicator);
    store.fetchIndicatorAnalysisData(indicator.indicatorId); // 调用store的方法更新全局数据
  }
</script>

<style scoped>
  .indicator-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .indicator-display .row {
    display: flex;
  }

  .indicator {
    flex: 1;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ccc;
    color: white;
  }

  .pagination-controls {
    margin-top: 20px;
  }

  .indicator-zoom {
    font-size: 20px;
    color: azure;
    margin-top: 20px;
  }
</style>
