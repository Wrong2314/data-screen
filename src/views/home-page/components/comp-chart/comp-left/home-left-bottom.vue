<template>
  <div id="left-bottom">
    <div v-for="(item, index) in list" :key="index">
      <div class="value-container" @click="handleLevelItemClick(item.label)">
        <div class="value-bg">
          <span class="value">{{ item.value }}</span>
        </div>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDataStore } from "@/store/dataStore";
  import { computed, reactive, watch } from "vue";

  export interface ILevelDataItem {
    name: string;
    indicatorIds: string[];
  }
  const store = useDataStore();
  watch(
    () => store.levelData,
    newData => {
      setLevelData(newData);
    }
  );
  let pageData = reactive<ILevelDataItem[]>([]);

  const list = computed(() =>
    pageData.map(item => {
      return { label: item.name, value: item.indicatorIds.length };
    })
  );
  function setLevelData(data: ILevelDataItem[]) {
    // 先清空数组
    pageData.splice(0, pageData.length);
    // 再添加新数据
    data.forEach(item => pageData.push(item));
  }

  const handleLevelItemClick = (value: string) => {
    // 在pageData中查找与value匹配的name属性的项
    const selectedItem = pageData.find(item => item.name === value);
    if (selectedItem) {
      const indicatorIds = selectedItem.indicatorIds;
      store.setHighLightTreeDataArr(indicatorIds);
    } else {
      console.error("未找到匹配的项");
    }
  };
</script>

<style scoped lang="scss">
  #left-bottom {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 25px 0 50px;
    min-height: 210px;

    .value-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .value-bg {
        width: 120px;
        height: 100px;
        padding-bottom: 20px;
        background: url("@/assets/images/left/bg-value.png") no-repeat center center/100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .value {
        font-size: 25px;
        font-weight: 600;
        background: linear-gradient(to bottom, #fff, #ecd237);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }

      .label {
        padding: 5px 0;
        margin-top: 5px;
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
        background: linear-gradient(to bottom, #fff, #56c8ed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        position: relative;
      }

      .label::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("@/assets/images/left/bg-label.png") no-repeat center center/100% 100%;
      }
    }
  }
</style>
