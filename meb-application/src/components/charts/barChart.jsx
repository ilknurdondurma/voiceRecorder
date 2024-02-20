import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, VisualMapComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    DatasetComponent,
    GridComponent,
    VisualMapComponent,
    BarChart,
    CanvasRenderer
]);

function EchartsBarChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && data) {
            const myChart = echarts.init(chartRef.current);
            const option = {
                dataset: {
                    source: data,
                    
                },
                grid: { containLabel: true },
                xAxis: { name: 'score' },
                yAxis: { type: 'category' },
                visualMap: {
                    orient: 'horizontal',
                    left: 'center',
                    min: 0,
                    max: 100,
                    text: ['High Score', 'Low Score'],
                    dimension: 0,
                    inRange: {
                        color: ['#c4e17f']
                    }
                },
                series: [
                    {
                        type: 'bar',
                        encode: {
                            x: 'amount',
                            y: 'product'
                        }
                    }
                ]
            };
            myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [data]);

    return <div ref={chartRef} className='w-full h-full'></div>;
}

export default EchartsBarChart;
