import { defineStore } from 'pinia';

export const useDateStore = defineStore('date', {
  state: () => ({
    startDate: '2024-01-01',
    endDate: '2024-09-09',
  }),
  actions: {
    setDates(start: string, end: string) {
      this.startDate = start;
      this.endDate = end;
    },
  },
});
