import ApexCharts from "apexcharts";

export const RESET_TIME = 1 * 60 * 1000;
export const DEFAULT_PRICE = 3385.67;

export const annotations = (
  startTime: number,
  endTime: number,
  currentYAnnotation: number
) => ({
  xaxis: [
    // Current
    {
      x: startTime,
      strokeDashArray: 4,
      borderColor: '#FF9900',
      label: {
        borderColor: '#FF9900',
        style: {
          color: '#fff',
          background: '#FF9900',
        },
        text: 'Current',
      },
    },
    // End
    {
      x: endTime,
      strokeDashArray: 4,
      borderColor: '#FF00FF',
      label: {
        borderColor: '#FF00FF',
        style: {
          color: '#fff',
          background: '#FF00FF',
        },
        text: 'End',
      },
    },
  ],
  yaxis: [
    {
      y: currentYAnnotation,
      strokeDashArray: 4,
      borderColor: '#FFF',
      label: {
        borderColor: '#FFFF',
        style: {
          color: '#fff',
          background: 'none',
        },
        text: 'Current',
      },
    },
  ],
});

export function getChartXAxisRange(currentTime: number) {
  const min = currentTime - RESET_TIME;
  const max = currentTime + RESET_TIME;
  return { min, max };
}
export const getChartOptions = ({
  xMin,
  xMax,
  startTime,
  endTime,
  currentYAnnotation,
}: {
  xMin: number;
  xMax: number;
  startTime: number;
  endTime: number;
  currentYAnnotation: number;
}): ApexCharts.ApexOptions | undefined => ({
  chart: {
    type: 'line',
    background: '#0f1319',
    foreColor: '#d9e4dd',
    toolbar: { show: false },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  colors: ['#00ff99'],
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  grid: {
    show: true,
    borderColor: '#2d2d2d',
    strokeDashArray: 4,
    xaxis: {
      lines: { show: true },
    },
    yaxis: {
      lines: { show: true },
    },
  },
  xaxis: {
    type: 'datetime',
    min: xMin, // hiển thị từ currentTime - 10'
    max: xMax, // đến currentTime + 10'
    labels: {
      show: true,
      datetimeUTC: false,
      style: {
        colors: '#ccc',
      },
      // Format time hiển thị (tuỳ ý)
      format: 'HH:mm:ss',
    },
    axisBorder: {
      show: true,
      color: '#444',
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        colors: '#ccc',
      },
      formatter: (val: number) => `$${val.toFixed(2)}`,
    },
  },
  tooltip: {
    theme: 'dark',
    x: {
      format: 'HH:mm:ss',
    },
    y: {
      formatter: (val: number) => `$${val.toFixed(2)}`,
    },
  },
  legend: { show: false },
  annotations: annotations(startTime, endTime, currentYAnnotation),
});