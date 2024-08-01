import React, { useState } from 'react';
import './ConditionalChartComponentInLayout.css';
import { chartConfig, chartData } from '../../assets/data';

const ChartComponent = () => {
  const config = chartConfig;
  const data = chartData;
  const [showChart] = useState(Math.random() >= 0.5);

  return (
      showChart ? (
        <rapid-g2plot-chart
          type="bar"
          config={config}
          data={data}
        ></rapid-g2plot-chart>
      ) : (
        <p key="message">Chart is currently hidden based on the random value.</p>
      )
  );
}

const ConditionalChartComponentInLayoutPage = () => {
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

export default ConditionalChartComponentInLayoutPage;