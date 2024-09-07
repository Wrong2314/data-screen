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
          <div class="first">
            <!-- 标题 -->
            <div class="section-small-title">
              <img :src="TitleLeftTop" alt="#" />
            </div>
            <div class="chart">
              <!-- <ChartLeftTop /> -->
            </div>
          </div>

          <!-- 左下质效指标 -->
          <div class="second">
            <div class="section-small-title">
              <img :src="TitleLeftBottom" alt="#" />
            </div>
            <div class="chart">
              <ChartLeftBottom />
            </div>
          </div>
        </div>

        <!-- 指标树 -->
        <div class="center">
          <DataTree></DataTree>
        </div>

        <!-- 右侧 -->
        <div class="both-sides right">
          <!-- 右侧顶部 -->
          <div class="first">
            <div class="charts">
              <ChartRightTop />
            </div>
          </div>

          <!-- 右侧中间 -->
          <div class="second">
            <div class="section-small-title">
              <img :src="TitleRightCenter" alt="#" />
            </div>
            <div class="chart">
              <ChartRightCenter />
            </div>
          </div>

          <!-- 右侧底部折线图 -->
          <div class="third">
            <div class="section-small-title">
              <img :src="TitleRightBottom" alt="#" />
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
  import { onMounted, ref } from "vue";

  import TitleLeftTop from "@/assets/images/title/left-top.png";
  import TitleLeftBottom from "@/assets/images/title/left-bottom.png";
  import TitleRightCenter from "@/assets/images/title/right-center.png";
  import TitleRightBottom from "@/assets/images/title/right-bottom.png";

  import HomeTime from "@/views/home-page/components/comp-time/home-time.vue";
  // import ChartLeftTop from "@/views/home-page/components/comp-chart/comp-left/home-left-top.vue";
  import ChartLeftBottom from "@/views/home-page/components/comp-chart/comp-left/home-left-bottom.vue";
  import ChartRightTop from "@/views/home-page/components/comp-chart/comp-right/home-right-top.vue";
  import ChartRightCenter from "@/views/home-page/components/comp-chart/comp-right/home-right-center.vue";
  import ChartRightBottom from "@/views/home-page/components/comp-chart/comp-right/home-right-bottom.vue";
  import DataTree from "@/views/home-page/components/comp-tree/data-tree.vue";

  const screenRef = ref();
  // 获取缩放比例
  function getScale(_w = 1920, _h = 1080) {
    const ww = window.innerWidth / _w;
    const wh = window.innerHeight / _h;
    return ww > wh ? wh : ww;
  }
  // 封装缩放方法
  function scale() {
    const scale = getScale();
    screenRef.value.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  }
  onMounted(() => {
    scale();
  });

  window.addEventListener("resize", () => {
    scale();
  });
</script>

<style lang="scss" scoped>
  @import "./components/home-css/home-style.scss";
  @import "./components/home-css/home-ani.scss";
</style>
