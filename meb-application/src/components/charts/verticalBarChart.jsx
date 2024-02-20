import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const VerticalBarChart = ({ cefr=70 }) => {
  const chartRef = useRef(null);
  const data = [
    { label: 'T1', value: (100/6)*1 },
    { label: 'T2', value: (100/6)*2 },
    { label: 'R1', value: (100/6)*3 },
    { label: 'R2', value: (100/6)*4 },
    { label: 'TR1', value: (100/6)*5 },
    { label: 'TR2', value: 100 },
  ];

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    // cefr değerine eşit olan çubuğun indeksini bul
    let maxIndex = 1;

    if ( 0 < cefr && cefr <= data[1].value) {
      maxIndex = 0; // A1 level
    }
    else if (data[0].value < cefr && cefr <= data[1].value) {
      maxIndex = 1; // A2 level
    } 
    else if (data[1].value < cefr && cefr <= data[2].value) {
      maxIndex = 2; // B1 level
    } 
    else if (data[2].value < cefr && cefr <= data[3].value) {
      maxIndex = 3; // B2 level
    } 
    else if (data[3].value < cefr && cefr <= data[4].value) {
      maxIndex = 4; // C1level
    } 
    else if (data[4].value < cefr && cefr <= 100) {
      maxIndex = 5; // C2 level
    }
    else {
      maxIndex = -1; // UNDEFİNED level
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
