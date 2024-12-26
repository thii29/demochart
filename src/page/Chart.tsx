import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  DEFAULT_PRICE,
  getChartOptions,
  getChartXAxisRange,
  RESET_TIME,
} from './ChartOption';
const Chart = () => {
  const now = Date.now();

  //khai bao state moc thoi gian
  const [startTime, setStartTime] = useState(now);
  const [endTime, setEndTime] = useState(now + RESET_TIME);

  //x la datetime, y la price
  const [seriesData, setSeriesData] = useState([{ x: now, y: DEFAULT_PRICE }]);
  const [currentYAnnotation, setCurrentYAnnotation] = useState(DEFAULT_PRICE);

  const currentTime = useMemo(
    () => seriesData[seriesData.length - 1].x,
    [seriesData]
  );
  const currentExceedPrice = useMemo(
    () => seriesData[seriesData.length - 1].y,
    [seriesData]
  );

  useEffect(() => {
    if (currentTime >= endTime) {
      setStartTime(endTime);
      setEndTime(endTime + RESET_TIME);
      setCurrentYAnnotation(currentExceedPrice);
    }
  }, [endTime, currentTime, currentExceedPrice]);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      const newPoint = {
        x: Date.now(),
        y: 3250 + Math.random() * 50, // 3250 - 3300
      };
      setSeriesData((prev) => [...prev, newPoint]);
    }, 500);
    return () => clearInterval(priceInterval);
  }, []);

  const { min: xMin, max: xMax } = getChartXAxisRange(currentTime);
  const chartSeries = [
    {
      name: 'ETH Price',
      data: seriesData,
    },
  ];

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactApexChart
        options={
          getChartOptions({
            xMin,
            xMax,
            startTime,
            endTime,
            currentYAnnotation,
          }) as ApexCharts.ApexOptions
        }
        series={chartSeries}
        type="line"
        height="100%"
      />
    </div>
  );
};
export default Chart;
