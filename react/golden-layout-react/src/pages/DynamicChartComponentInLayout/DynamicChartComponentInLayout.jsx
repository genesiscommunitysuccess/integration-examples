import React, { useState, useEffect } from 'react';
import './DynamicChartComponentInLayout.css';
import { chartConfig, chartData } from '../../assets/data';

const ChartComponent = () => {
  const config = chartConfig;
  const data = chartData;
  
  const [showChart, setShowChart] = useState(Math.random() >= 0.5);

  //Uncomment the following code to see the chart visibility change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.random() >= 0.5;
      setShowChart(randomValue);
      alert(`Chart visibility is now set to ${randomValue}`)
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      {showChart ? (
        <rapid-g2plot-chart
          type="bar"
          config={config}
          data={data}
        ></rapid-g2plot-chart>
      ) : (
        <p key="message">Chart is currently hidden based on the random value.</p>
      )}
    </div>
  );
}

const DynamicChartComponentInLayoutPage = () => {
  return (
    <rapid-layout>
      <rapid-layout-region type="horizontal">
        <rapid-layout-region type="vertical">
          <rapid-layout-item title="Chart react component in layout">
            <ChartComponent />
          </rapid-layout-item>
        </rapid-layout-region>
      </rapid-layout-region>
    </rapid-layout>
  );
};

export default DynamicChartComponentInLayoutPage;