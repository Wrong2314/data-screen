export function useIntervalFn(
  domId: string,
  echarts: typeof import("echarts/types/dist/echarts"),
  option: any,
  time: number
) {
  const mainDom = document.getElementById(domId) as HTMLElement;
  const myChart = echarts.init(mainDom);
  myChart.setOption(option);
  // 每过3秒钟更新一次数据
  const timerId = setInterval(() => {
    const { series } = option;
    series.forEach((item: { data: number[] }) => {
      item.data = [];
      item.data.push(
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20)
      );
    });
    myChart.setOption(option);
  }, 1000 * time);
  // 返回定时器id，方便清除定时器
  return timerId;
}

export function useIntervalDisposeFn(
  domId: string,
  timerId: NodeJS.Timeout,
  echarts: typeof import("echarts/types/dist/echarts")
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.removeEventListener("resize", () => {});
  // 销毁echarts实例
  echarts.dispose(document.getElementById(domId) as HTMLElement);
  clearInterval(timerId);
}
