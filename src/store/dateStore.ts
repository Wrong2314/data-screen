import axios from "axios";
import { defineStore } from "pinia";

export const useDateStore = defineStore("date", {
  state: () => ({
    startDate: "2024-01-01",
    endDate: "2024-09-09",
    indicatorAnalysisData: {},
    treeData: {},
    levelData: {},
    indicatorDetailData: {},
    bizLineData: {},
    timeLineData: {},
  }),
  actions: {
    setDates(start: string, end: string) {
      this.startDate = start;
      this.endDate = end;
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
    async fetchTreeData(areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/indicator_tree?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}`);
        this.treeData = response.data;
      } catch (error) {
        console.error("fetchTreeData failed:", error);
      }
    },
    async fetchLevelData(areaId?: string) {
      try {
        const response = await axios.get(`/api/v1/spzx/zxzbqk?kssj=${this.startDate}&jssj=${this.endDate}&areaId=${areaId}`);
        this.levelData = response.data;
      } catch (error) {
        console.error("fetchLevelData failed:", error);
      }
    },
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
