import './SimpleChartInLayout.css';
import { chartConfig, chartData } from '../../assets/data'

const SimpleChartInLayoutPage = () => {
  const config = chartConfig;
  const data = chartData;

  return (
    <rapid-layout>
      <rapid-layout-region type="horizontal">
        <rapid-layout-region type="vertical">
          <rapid-layout-item title="Chart in layout">
          <rapid-g2plot-chart
            type="bar"
            config={config}
            data={data}
            ></rapid-g2plot-chart>
          </rapid-layout-item>
        </rapid-layout-region>
      </rapid-layout-region>
    </rapid-layout>
  );
};

export default SimpleChartInLayoutPage;
