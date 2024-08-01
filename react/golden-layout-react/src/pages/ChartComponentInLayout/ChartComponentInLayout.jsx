import './ChartComponentInLayout.css';
import { chartConfig, chartData } from '../../assets/data'

const ChartComponent = () => {
  const config = chartConfig;
  const data = chartData;

  return (
    <rapid-g2plot-chart
      type="bar"
      config={config}
      data={data}
      ></rapid-g2plot-chart>
  );
}

const ChartComponentInLayoutPage = () => {
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

export default ChartComponentInLayoutPage;
