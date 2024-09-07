<template>
  <div class="left-bottom">
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
  .left-bottom {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px 0;

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
        margin-top: 5px;
        padding: 5px 0;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        background: url("@/assets/images/left/bg-label.png") no-repeat center center/100% 100%;
      }
    }
  }
</style>
