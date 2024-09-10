<template>
  <div class="indicator-container">
    <div class="indicator-display">
      <div :class="['row', index % 2 ? 'gap-long' : 'gap-short']" v-for="(row, index) in displayedRows" :key="index">
        <!-- 添加点击事件监听 -->
        <div
          v-for="(indicator, innerIndex) in row"
          :key="indicator.indicatorId"
          :class="['indicator', getBackground(indicator.indicatorId, innerIndex)]"
          @click="handleIndicatorClick(indicator)"
        >
          <div class="indicator-value">
            <img :src="getIndicatorPic" alt="#" v-if="isShow(indicator.indicatorId) && innerIndex % 2" />
            <span>{{ indicator.name }}</span>
            <span>{{ indicator.value }}%</span>
            <img :src="getIndicatorPic" alt="#" v-if="isShow(indicator.indicatorId) && !(innerIndex % 2)" />
          </div>
        </div>
      </div>
    </div>
    <!-- 底部展示 -->
    <div class="pagination-controls">
      <img :src="leftButton" alt="#" @click="prevPage" />
      <div class="indicator-zoom">
        <div>
          <span class="label">{{ centerData?.name }}</span>
          <span class="value">{{ centerData?.value }}</span>
          <span class="label">%</span>
        </div>
      </div>
      <img :src="rightButton" alt="#" @click="nextPage" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useDataStore } from "@/store/dataStore";
  import { reactive, computed, watch } from "vue";
  import leftButton from "@/assets/images/center/left-button.png";
  import rightButton from "@/assets/images/center/right-button.png";
  import good from "@/assets/images/center/good.png";
  import mid from "@/assets/images/center/mid.png";
  import bad from "@/assets/images/center/bad.png";

  export interface IHighLightTreeDataObj {
    name: string;
    highLightTreeDataIdArr: string[];
  }
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
    highLightTreeDataObj: IHighLightTreeDataObj | null;
  }

  const pageData = reactive<IPageData>({
    indicators: [], // 存储指标数据
    activeIndicator: null, //当前选中的指标
    currentPage: 0, // 当前页码
    pageSize: 16, // 每页显示的指标数（8行，每行2个）
    highLightTreeDataArr: [],
    highLightTreeDataObj: null,
  });
  const centerData = computed(() => pageData.indicators.find(item => item.name === "达标率"));

  const isShow = (indicatorId: string) => {
    return pageData.highLightTreeDataArr.map(item => item.indicatorId).includes(indicatorId);
  };

  const store = useDataStore();
  //更新当前treeData指标
  watch(
    () => store.treeData,
    newData => {
      setIndicators(newData);
    }
  );

  //更新当前treeData需要高亮的指标
  watch(
    () => store.highLightTreeDataObj,
    newData => {
      pageData.highLightTreeDataObj = newData;

      const { highLightTreeDataIdArr } = newData;
      // 遍历新的高亮指标ID数组
      pageData.highLightTreeDataArr = highLightTreeDataIdArr.reduce((acc, item) => {
        const foundIndicator = pageData.indicators.find(indicator => indicator.indicatorId === item);
        acc.push(foundIndicator);
        return acc;
      }, []);
    }
  );

  // 使用computed创建计算属性
  const displayedRows = computed(() => {
    const start = pageData.currentPage * pageData.pageSize;
    const end = start + pageData.pageSize;
    const pageIndicators = (pageData.indicators || []).filter(item => item.name !== "达标率").slice(start, end);
    let rows = [];
    for (let i = 0; i < pageIndicators.length; i += 2) {
      rows.push(pageIndicators.slice(i, i + 2));
    }
    return rows;
  });

  const levelMapping: Record<string, string> = {
    优于合理区间: good,
    "处于/无合理区间": mid,
    劣于合理区间: bad,
  };

  const getIndicatorPic = computed(() => levelMapping[pageData.highLightTreeDataObj?.name || "优于合理区间"]);

  const getBackground = (indicatorId: string, innerIndex: number) => {
    const isHighlighted = pageData.activeIndicator?.indicatorId === indicatorId ? "-active" : "";
    return innerIndex % 2 ? `bg-right${isHighlighted}` : `bg-left${isHighlighted}`;
  };

  function setIndicators(data: IData[]) {
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
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .indicator-display {
    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -15px;
    }

    .gap-short {
      gap: 50px;
    }

    .gap-long {
      gap: 270px;
    }
  }

  .indicator {
    color: white;
    min-width: 337px;
    height: 87px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .bg-left {
    padding-right: 60px;
    justify-content: flex-end;
    background: url("@/assets/images/center/left-bg.png") no-repeat center center/100% 100% !important;
  }

  .bg-left-active {
    padding-right: 60px;
    justify-content: flex-end;
    background: url("@/assets/images/center/left-active-bg.png") no-repeat center center/100% 100% !important;
  }

  .bg-right {
    padding-left: 60px;
    justify-content: flex-start;
    background: url("@/assets/images/center/right-bg.png") no-repeat center center/100% 100% !important;
  }

  /* TODO: 修改背景图 */
  .bg-right-active {
    padding-left: 60px;
    justify-content: flex-start;
    background: url("@/assets/images/center/right-active-bg.png") no-repeat center center/100% 100% !important;
  }

  .indicator-value {
    font-size: 25px;
    font-weight: 700;
    gap: 5px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }

  .pagination-controls {
    position: fixed;
    bottom: 63px;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    img {
      cursor: pointer;
    }

    .indicator-zoom {
      color: azure;
      font-size: 25px;
      font-weight: 900;
      height: 140px;
      width: 294px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("@/assets/images/center/bottom.png") no-repeat center center/100% 100%;

      .value {
        margin: 0 5px;
        font-size: 30px;
        font-weight: 1000;
        background: linear-gradient(to bottom, #fff, #ecd237);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }
    }
  }
</style>
