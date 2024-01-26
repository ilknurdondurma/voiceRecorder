import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const PieChart = ({ data }) => {
  useEffect(() => {
    // ECharts grafiği oluşturun
    const chart = echarts.init(document.getElementById('pieChart'));

    // Grafiği yapılandırın
    const options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#d2392e',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'center',
            formatter: '{d}%',
            fontSize: 40,
            fontWeight: 'bold'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'

            }
          },
          labelLine: {
            show: true
          },
          data:data,
          itemStyle: {
            color: function (params) {
              const colorList = ['#c4e17f','#d2392e', ]; // İstediğiniz renkleri ekleyebilirsiniz
              return colorList[params.dataIndex];
            },
          },
    }]}

    // Grafiği çizin
    chart.setOption(options);
    
    // ComponentWillUnmount benzeri işlem
    return () => {
      chart.dispose();
    };
  }, [data]); // useEffect, data değiştiğinde çalışsın

  return <div id="pieChart" style={{ width: '100%', height: '100%' }}></div>;
};

export default PieChart;
