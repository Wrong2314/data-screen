<template>
  <div class="left-bottom">
    <div v-for="(item, index) in list" :key="index">
      <div class="value-container">
        <div class="value-bg">
          <span class="value">{{ item.value }}</span>
        </div>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const list = [
    { label: "优于合理区间", value: 3 },
    { label: "处于/无合理区间", value: 3 },
    { label: "劣于合理区间", value: 3 },
  ];
</script>

<style scoped lang="scss">
  .left-bottom {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

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
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        background: url("@/assets/images/left/bg-label.png") no-repeat center center/100% 100%;
      }
    }
  }
</style>
