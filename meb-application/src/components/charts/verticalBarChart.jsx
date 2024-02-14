import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const VerticalBarChart = ({ cefr }) => {
  const chartRef = useRef(null);
  const data = [
    { label: 'A1', value: 20 },
    { label: 'A2', value: 40 },
    { label: 'B1', value: 60 },
    { label: 'B2', value: 80 },
    { label: 'C1', value: 95 },
    { label: 'C2', value: 100 },
  ];

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    let maxIndex = 0;

    // Determine the CEFR level based on the cefr value
    if (cefr >= 95) {
      maxIndex = 5; // C2 level
    } else if (cefr >= 80) {
      maxIndex = 4; // C1 level
    } else if (cefr >= 60) {
      maxIndex = 3; // B2 level
    } else if (cefr >= 40) {
      maxIndex = 2; // B1 level
    } else if (cefr >= 20) {
      maxIndex = 1; // A2 level
    } else {
      maxIndex = 0; // A1 level
    }

    const option = {
      xAxis: {
        show: false,
        type: 'category',
        data: labels
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          color: '#9ca3af',
          data: values.map((value, index) => ({
            value,
            label: {
              show: true,
              position: 'inside',
              color: index === maxIndex ? '#ffffff' : '#000000', // Label color: white for the CEFR level, black otherwise
              fontSize: index === maxIndex ? 30 : 14, // Label font size: 30 for the CEFR level, 14 otherwise
              formatter: index === maxIndex ? '{b}' : '{b}' // Custom formatter for the label
            },
            itemStyle: {
              color: index === maxIndex ? '#c4e17f' : null // Color: green for the CEFR level, default otherwise
            }
          })),
          type: 'bar'
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // Dispose the chart instance when the component unmounts to avoid memory leaks
    };
  }, [cefr, data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default VerticalBarChart;
