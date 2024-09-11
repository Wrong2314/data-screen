<template>
  <!-- 大屏主页 page -->
  <div class="container">
    <!-- 主内容 外容器 -->
    <div class="screen" ref="screenRef">
      <!-- 大屏 标题 -->
      <header>
        <HomeTime />
      </header>

      <!-- 下部分 内容区域-->
      <section>
        <!-- 左侧 -->
        <div class="both-sides left">
          <!-- 左侧列表 -->
          <div class="sides-item">
            <div class="section-small-title">
              <span class="label">{{ activeName || "达标率" }}分析</span>
            </div>
            <div class="chart">
              <ChartLeftTop />
            </div>
          </div>

          <!-- 左下质效指标 -->
          <div class="bottom">
            <div class="section-small-title">
              <span class="label">质效指标情况</span>
            </div>
            <div class="chart">
              <ChartLeftBottom />
            </div>
          </div>
        </div>

        <!-- 指标树 -->
        <div class="center">
          <DataTree />
        </div>

        <!-- 右侧 -->
        <div class="both-sides right">
          <!-- 右侧顶部 -->
          <div class="sides-item">
            <ChartRightTop />
          </div>

          <!-- 右侧中间 -->
          <div class="sides-item">
            <div class="section-small-title">
              <span class="label">业务条线</span>
            </div>
            <div class="chart">
              <ChartRightCenter />
            </div>
          </div>

          <!-- 右侧底部折线图 -->
          <div class="sides-item">
            <div class="section-small-title">
              <span class="label">时间趋势</span>
            </div>
            <div class="chart">
              <ChartRightBottom />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { useDataStore } from "@/store/dataStore";
  import HomeTime from "@/views/home-page/components/comp-time/home-time.vue";
  import ChartLeftTop from "@/views/home-page/components/comp-chart/comp-left/home-left-top.vue";
  import ChartLeftBottom from "@/views/home-page/components/comp-chart/comp-left/home-left-bottom.vue";
  import ChartRightTop from "@/views/home-page/components/comp-chart/comp-right/home-right-top.vue";
  import ChartRightCenter from "@/views/home-page/components/comp-chart/comp-right/home-right-center.vue";
  import ChartRightBottom from "@/views/home-page/components/comp-chart/comp-right/home-right-bottom.vue";
  import DataTree from "@/views/home-page/components/comp-tree/data-tree.vue";

  const store = useDataStore();
  const activeName = computed(() => store.activeTreeData?.name);

  const screenRef = ref();
  // 获取缩放比例
  function getScale(_w = 1920, _h = 1080) {
    const ww = window.innerWidth / _w;
    const wh = window.innerHeight / _h;
    return wh;
  }

  // 封装缩放方法
  function scale() {
    const scaleRatio = getScale();
    const newWidth = window.innerWidth / scaleRatio;
    screenRef.value.style.width = `${newWidth}px`;
    screenRef.value.style.transform = `scale(${scaleRatio})`;
    screenRef.value.style.transformOrigin = "top left";
  }

  onMounted(() => {
    scale();
  });

  window.addEventListener("resize", () => {
    scale();
  });
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url(@/assets/images/bg.jpg) no-repeat center center;
    background-size: 100% 100%;

    .screen {
      height: 1080px;

      // 头部
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 70px;
        line-height: 90px;
        font-size: 49px;
      }

      // 主体
      section {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 100px);
        padding-top: 40px;

        // 标题
        .section-small-title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          background: url("@/assets/images/title.jpg") no-repeat center center/100% 100%;

          .label {
            padding-left: 45px;
          }
        }

        .both-sides {
          flex: 1;
          display: flex;
          flex-direction: column;

          .sides-item {
            flex: 1;
          }

          .chart {
            width: 100%;
            height: calc(100% - 50px);
          }
        }

        .left {
          animation: both-sides-left 1.5s;

          .section-small-title {
            margin-left: 25px;
          }
        }

        // 从左到右进入动画
        @keyframes both-sides-left {
          from {
            transform: translateX(-100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .right {
          animation: both-sides-right 1.5s;
        }

        // 从右到左进入动画
        @keyframes both-sides-right {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }

        // 中间区域
        .center {
          position: relative;
          flex: 2;
          display: flex;
          align-items: center;
          padding-bottom: 100px;
          overflow: hidden;
        }
      }
    }
  }
</style>

<style>
  body {
    font-family: "Microsoft YaHei", sans-serif;
  }
</style>
