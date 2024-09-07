import { ILevelDataItem } from "@/views/home-page/components/comp-chart/comp-left/home-left-bottom.vue";
import { IAnalysisData } from "@/views/home-page/components/comp-chart/comp-left/home-left-top.vue";
import { IData } from "@/views/home-page/components/comp-tree/data-tree.vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    startDate: "2024-01-01",
    endDate: "2024-09-09",
    activeTreeData: {}, //当前选中的tree指标
    indicatorAnalysisData: {} as IAnalysisData, //当前的xx分析信息
    treeData: [] as IData[], //当前条件全部tree指标
    levelData: [] as ILevelDataItem[], //当前条件level信息
    indicatorDetailData: {}, //右上角指标详情
    bizLineData: {}, //业务条线
    timeLineData: {}, //时间趋势
    highLightTreeDataIdArr: [] as string[], //需要高亮展示的指标id
  }),
  actions: {
    setDates(start: string, end: string) {
      this.startDate = start;
      this.endDate = end;
    },
    setActiveTreeData(data: IData) {
      this.activeTreeData = data;
    },
    setHighLightTreeDataArr(dataArr: string[]) {
      this.highLightTreeDataIdArr = dataArr;
    },
    // 测试用
    async initMockData() {
      //后面换成真实接口~
      setTimeout(() => {
        this.indicatorAnalysisData = {
          indicatorName: "达标率", //指标名称
          topShowIndicator: {
            name: "全市辖区", //名称，如：全市辖区、全省辖区、本院
            code: "2400_fyxq", //代码值，当前展示地区的代码值，用于选中查询其他接口的条件，如：2400_fyxq、2401
            value: "70.0991%", //指标值 带单位 最多小数点后4位，如：70.0991%
            compareWithPeriod: "12.14%", //较上期 带单位 保留小数点后2位，如：12.14%
            trend: "1", //趋势 1-上升 2-下降 3-持平
          }, //顶部指标展示
          rankInfoList: [
            {
              rank: 1, //排名，如：1
              code: "2400_fyxq", //代码值，当前展示地区的代码值，用于选中查询其他接口的条件，如：2400_fyxq、2401
              name: "长春市中级人民法院", //名称，如：长春市中级人民法院，长春净月高新技术产业开发区人民法院
              value: "80", //指标值
              canSelected: true, //是否可选中，true: 可以 false: 不可以. 用于判断排序的列表元素是否可以点击触发查询
            },
          ], //排名情况
        };
        this.treeData = [
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
          { indicatorId: "nnn", name: "nnn", value: 10 },
          { indicatorId: "ooo", name: "ooo", value: 10 },
          { indicatorId: "ppp", name: "ppp", value: 10 },
          { indicatorId: "qqq", name: "qqq", value: 10 },
          { indicatorId: "rrr", name: "rrr", value: 10 },
          { indicatorId: "sss", name: "sss", value: 10 },
          { indicatorId: "ttt", name: "ttt", value: 10 },
          { indicatorId: "uuu", name: "uuu", value: 10 },
          { indicatorId: "vvv", name: "vvv", value: 10 },
          { indicatorId: "www", name: "www", value: 10 },
          { indicatorId: "xxx", name: "xxx", value: 10 },
          { indicatorId: "yyy", name: "yyy", value: 10 },
          { indicatorId: "zzz", name: "zzz", value: 10 },
        ];
        this.levelData = [
          {
            name: "优于合理区间", //展示名称，如：优于合理区间、处于/无合理区间、劣于合理区间
            indicatorIds: ["aaa", "bbb"], //满足当前区间的指标id，用于点击时联动中间指标树的高亮显示
          },
          {
            name: "处于/无合理区间", //展示名称，如：优于合理区间、处于/无合理区间、劣于合理区间
            indicatorIds: ["ccc"], //满足当前区间的指标id，用于点击时联动中间指标树的高亮显示
          },
          {
            name: "劣于合理区间", //展示名称，如：优于合理区间、处于/无合理区间、劣于合理区间
            indicatorIds: ["ddd", "eee", "fff"], //满足当前区间的指标id，用于点击时联动中间指标树的高亮显示
          },
        ];
      }, 2000);
    },
    //点击tree指标更新全局数据
    async fetchIndicatorAnalysisData(indicatorId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/any_indicator_analysis?kssj=${this.startDate}&jssj=${this.endDate}&indicatorId=${indicatorId}`);
        this.indicatorAnalysisData = response.data;
      } catch (error) {
        console.error("fetchIndicatorAnalysisData failed:", error);
      }
    },
    //点击排名列表项更新全局数据
    async fetchTreeData(areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/indicator_tree?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}`);
        this.treeData = response.data;
      } catch (error) {
        console.error("fetchTreeData failed:", error);
      }
    },
    //点击排名列表项更新全局数据
    async fetchLevelData(areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/zxzbqk?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}`);
        this.levelData = response.data;
      } catch (error) {
        console.error("fetchLevelData failed:", error);
      }
    },
    //点击排名列表项更新全局数据
    async fetchDetailData(indicatorId?: string, areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/indicator_info?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}&indicatorId=${indicatorId}`);
        this.indicatorDetailData = response.data;
      } catch (error) {
        console.error("fetchDetailData failed:", error);
      }
    },
    async fetchBizLine(indicatorId?: string, areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/business_line?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}&indicatorId=${indicatorId}`);
        this.bizLineData = response.data;
      } catch (error) {
        console.error("fetchBizLine failed:", error);
      }
    },
    async fetchTimeLine(indicatorId?: string, areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/time_trend?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}&indicatorId=${indicatorId}`);
        this.timeLineData = response.data;
      } catch (error) {
        console.error("fetchTimeLine failed:", error);
      }
    },
  },
});
