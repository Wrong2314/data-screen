<template>
  <!-- 天气 page -->
  <div class="weather" v-show="showFlag">
    <span>{{ province }} - {{ city }} - {{ weather }}</span>
    <i :class="iconUrl"></i>
    <span style="font-size: 25px; margin-left: 10px">{{ temperature }} </span
    >&nbsp;
    <span style="font-size: 16px">℃</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getLocation, getWeather } from "@/api/api";
let showFlag = ref(false);
const province = ref("");
const city = ref("");
const weather = ref("");
const temperature = ref("");

// 获取位置
async function getInfoFn() {
  // 如果用户短时间多次进入页面,则不再请求
  if (showFlag.value) return;
  const { data: res } = await getLocation();
  if (res.status === 0) return console.log("获取位置失败");

  const abCode = res.adcode;
  // 存入时间和code 用于判断是否需要重新请求
  localStorage.setItem(
    "locationInfo",
    JSON.stringify({ time: Date.now(), code: abCode })
  );
  getWeatherFn(abCode);
}

// 获取天气
async function getWeatherFn(payLoad: string) {
  const { data: res } = await getWeather({
    city: payLoad,
    key: "33f7405fa0049ff120947b37a12567b2",
  });
  if (res.status === 0) return console.log("获取天气失败");
  showFlag.value = true;
  province.value = res.lives[0].province;
  city.value = res.lives[0].city;
  weather.value = res.lives[0].weather;
  temperature.value = res.lives[0].temperature;
}

// 定义interface
interface IconMap {
  [key: string]: string;
}
// 计算天气图标类型
const iconMap: IconMap = {
  晴: "iconfont icon-31qing",
  多云: "iconfont icon-qingjianduoyun",
  阴: "iconfont icon-yin",
  "雷阵雨|阵雨|强阵雨|强雷阵雨": "iconfont icon-leizhenyu",
  雷阵雨并伴有冰雹: "iconfont icon-leizhenyubingbanyoubingbao",
  "小雨|毛毛雨|细雨|中雨|大雨|冻雨": "iconfont icon-xiaoyu",
  "暴雨|大暴雨": "iconfont icon-baoyu",
  "特大暴雨|极端降雨": "iconfont icon-n-dabaoyuzhuantedabaoyu",
  "雨雪天气|雨夹雪|阵雨夹雪": "iconfont icon-leizhenyu",
  "小雪|中雪|大雪|雪": "iconfont icon-xiaoxue",
  暴雪: "iconfont icon-baoxue",
  阵雪: "iconfont icon-zhenxue",
  "扬沙|沙尘暴|强沙尘暴": "iconfont icon-qiangshachenbao",
  浮尘: "iconfont icon-fuchen",
  霾: "iconfont icon-mai",
  "平静|和风|清风": "iconfont icon-youfeng",
  "有风|微风": "iconfont icon-feng",
  "强风|劲风|疾风|大风|烈风|风暴|狂爆风|飓风|热带风暴":
    "iconfont icon-redaifengbao",
  龙卷风: "iconfont icon-longjuanfeng",
  轻雾: "iconfont icon-wu",
  热: "iconfont icon-redu",
  冷: "iconfont icon-leng",
  "浓雾|大雾": "iconfont icon-tianqi-teqiangnongwu",
};

function getIconUrl(weather: string) {
  for (const itemCondition in iconMap) {
    const regex = new RegExp(itemCondition);
    if (regex.test(weather)) {
      return iconMap[itemCondition];
    }
  }
}

const iconUrl = computed(() => getIconUrl(weather.value));
// 测试
// const iconUrl = computed(() => getIconUrl("阵雪"));

onMounted(() => {
  // 封装优化请求,请求的时候存本地且不过期,就使用本地数据,否则重新请求,
  //在页面加载调用一下这个函数,不去直接调用getType请求接口
  //  判断本地有没有数据
  const cates = localStorage.getItem("locationInfo")
    ? JSON.parse(localStorage.getItem("locationInfo") || "")
    : {};
  if (!cates) {
    // 如果本地没有cates,就网络请求数据
    getInfoFn();
  } else {
    //本地有数据判断是否过期了//cates.time是本地的时间字段
    if (Date.now() - cates.time > 1000 * 600) {
      getInfoFn();
      //当前时间 - 存的时间 > 10分钟 10分钟外就重新调用
    } else {
      //有数据且没过期时
      getWeatherFn(cates.code);
      //将本地的数据赋值给定义的总数据data里的cates
      console.log(
        "本地有数据，且没有过期大于10分钟,不发送网络请求，使用渲染本地的数据"
      );
    }
  }
});
</script>

<style scoped lang="scss">
@import url("@/assets/iconFont/iconfont.css");

.weather {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 100px;
  top: 15px;
  font-size: 22px;
  background-image: linear-gradient(to right, #fe6601, #ff953c, #fc741a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s ease-in-out infinite;

  .iconfont {
    color: #fff !important;
    margin-left: 10px;
    font-size: 30px;
  }

  @keyframes shine {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 280px 0;
    }
  }

  img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
    border-radius: 50%;
  }
}
</style>
