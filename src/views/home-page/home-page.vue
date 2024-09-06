<template>
  <!-- 大屏主页 page -->
  <div class="container">
    <!-- 主内容 外容器 -->
    <div class="screen" ref="screenRef">
      <!-- 大屏 标题 -->
      <header>
        <homeWeather />
        <homeTime />
        <!--<div class="title">天天银行数据安全综合态势平台</div>-->
      </header>

      <!-- 下部分 内容区域-->
      <section>
        <!-- 左侧 -->
        <div class="both-sides left">
          <!-- 左侧列表 -->
          <div class="first">
            <!-- 标题 -->
            <div class="section-small-title">
              <img :src="leftTop" alt="#" />
            </div>
            <div class="chart">
              <ChartTop />
            </div>
          </div>

          <!-- 左下质效指标 -->
          <div class="second">
            <div class="section-small-title">
              <img :src="leftBottom" alt="#" />
            </div>
            <div class="chart">
              <ChartBottom />
            </div>
          </div>
        </div>

        <!-- 指标树 -->
        <div class="center">
          <router-view></router-view>
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
              <img :src="rightTop" alt="#" />
            </div>
            <div class="chart">
              <ChartRightCenter />
            </div>
          </div>

          <!-- 右侧底部折线图 -->
          <div class="third">
            <div class="section-small-title">
              <img :src="rightBottom" alt="#" />
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
/***
 * 盒子的原点在正中间，我们需要让原点在屏幕的正中间，如果原点不在屏幕正中间放大缩小，有可能会超出屏幕，
 * 我们使用固定定位让盒子负50%，再把盒子的原点设置为左上角，这样原点就在屏幕的正中间了，
 * 屏幕宽度除以设计稿的宽度得到你放大或缩小的比例倍数，用这个倍数在你页面加载的时候先缩放，再将盒子归位
 */
import { onMounted, ref } from "vue";
import leftTop from "@/assets/images/title/leftTop.png";
import leftBottom from "@/assets/images/title/leftBottom.png";
import rightTop from "@/assets/images/title/rightTop.png";
import rightBottom from "@/assets/images/title/rightBottom.png";

// 左侧
import ChartTop from "./components/comp-chart/comp-left/home-left-top.vue";
import ChartBottom from "./components/comp-chart/comp-left/home-left-bottom.vue";

// 右侧
import ChartRightTop from "./components/comp-chart/comp-right/home-right-top.vue";
import ChartRightCenter from "./components/comp-chart/comp-right/home-right-center.vue";
import ChartRightBottom from "./components/comp-chart/comp-right/home-right-bottom.vue";

// 时间
import homeTime from "@/views/home-page/components/copm-time/home-time.vue";
// 天气
import homeWeather from "@/views/home-page/components/copm-time/home-weather.vue";
const screenRef = ref();
// 获取缩放比例
function getScale(_w = 1920, _h = 1080) {
  const ww = window.innerWidth / _w;
  const wh = window.innerHeight / _h;
  // ww > wh 什么情况下是true？当屏幕宽度大于高度的时候，我们取高度的比例，反之取宽度的比例
  return ww > wh ? wh : ww;
}
// 封装缩放方法
function scale() {
  const scale = getScale();
  // 先缩放在归位
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
// 首页css
@import "./components/home-css/home-style.scss";
// 标题动画组css
@import "./components/home-css/home-ani.scss";
</style>
