<template>
  <div class="indicator-container">
    <!-- 指标展示区域 -->
    <div class="indicator-display">
      <div class="row" v-for="(row, index) in displayedRows" :key="index">
        <div class="indicator" v-for="indicator in row" :key="indicator.indicatorId">
          {{ indicator.name }}
        </div>
      </div>
    </div>
    <!-- 分页控制 -->
    <div class="pagination-controls">
      <button @click="prevPage">←</button>
      <button @click="nextPage">→</button>
    </div>
    <!-- 放大展示区域 -->
    <div class="indicator-zoom">
      <div v-if="pageData.indicators.length > 0">
        {{ pageData.indicators[0].name }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, reactive, computed } from "vue";

  export interface IData {
    indicatorId: string;
    name: string;
    value: number;
  }
  export interface IPageData {
    indicators: IData[];
    currentPage: number;
    pageSize: number;
  }
  const pageData = reactive<IPageData>({
    indicators: [], // 存储指标数据
    currentPage: 0, // 当前页码
    pageSize: 16, // 每页显示的指标数（8行，每行2个）
  });

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

  // 获取指标数据
  function fetchIndicators() {
    const mockData: IData[] = [
      // 确保每个指标的indicatorId是唯一的
      { indicatorId: "aaa", name: "aaa", value: 10 },
      { indicatorId: "bbb", name: "bbb", value: 10 },
      { indicatorId: "ccc", name: "ccc", value: 10 },
      { indicatorId: "ddd", name: "ddd", value: 10 },
      { indicatorId: "eee", name: "eee", value: 10 },
      { indicatorId: "fff", name: "fff", value: 10 },
      { indicatorId: "ggg", name: "ggg", value: 10 },
      { indicatorId: "hhh", name: "hhh", value: 10 },
      { indicatorId: "iii", name: "iii", value: 10 },
      { indicatorId: "jjj", name: "jjj", value: 10 },
      { indicatorId: "kkk", name: "kkk", value: 10 },
      { indicatorId: "lll", name: "lll", value: 10 },
      { indicatorId: "mmm", name: "mmm", value: 10 },
    ];
    pageData.indicators = mockData; // 从API获取数据并赋值
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

  onMounted(() => {
    fetchIndicators();
  });
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
  }

  .pagination-controls {
    margin-top: 20px;
  }

  .indicator-zoom {
    margin-top: 20px;
    font-size: 20px;
  }
</style>
