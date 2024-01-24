import { useState, useRef, useEffect } from 'react';
import {
  FoundationLayout,
  LayoutEmitEvents,
} from '@genesislcap/foundation-layout';
import { G2PlotChart } from '@genesislcap/g2plot-chart';
import {
  CriteriaSegmentedControlOption,
  Serialisers,
  CriteriaSegmentedControl,
} from '@genesislcap/foundation-criteria';
import * as savedLayout from '../../sample-data/saved-layouts';
import {
  AnalyticChartRegistration,
  SavedLayoutKeys,
  LayoutComponentsNames,
} from './AnalyticsPage.types';
import {
  areaConfiguration,
  barConfiguration,
  barData,
  columnConfiguration,
  dualaxesConfiguration,
  dualaxesData,
  lineConfiguration,
  pieConfiguration,
  pieData,
  roseConfiguration,
  roseData,
  stockConfiguration,
  stockData,
  mixConfiguration,
} from '../../sample-data';
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
} from '../../utils/goldenLayout.helper';
import style from './AnalyticsPage.module.css';

const chartConfigMap: Map<LayoutComponentsNames, any> = new Map([
  [LayoutComponentsNames.AREA, areaConfiguration as any],
  [LayoutComponentsNames.BAR, barConfiguration as any],
  [LayoutComponentsNames.COLUMN, columnConfiguration as any],
  [LayoutComponentsNames.LINE, lineConfiguration as any],
  [LayoutComponentsNames.MIX, mixConfiguration as any],
  [LayoutComponentsNames.PIE, pieConfiguration as any],
  [LayoutComponentsNames.ROSE, roseConfiguration as any],
  [LayoutComponentsNames.STOCK, stockConfiguration as any],
  [LayoutComponentsNames.DONUT, pieConfiguration as any],
]);
const chartDataMap: Map<LayoutComponentsNames, any> = new Map([
  [LayoutComponentsNames.BAR, barData as any],
  [LayoutComponentsNames.PIE, pieData as any],
  [LayoutComponentsNames.ROSE, roseData as any],
  [LayoutComponentsNames.STOCK, stockData as any],
]);
const layoutSaveKey = 'analytics-layout-save-key';
const toolbarOptions: CriteriaSegmentedControlOption[] = [
  {
    label: 'VOD',
    field: 'INSTRUMENT_ID',
    value: 'VOD',
    serialiser: Serialisers.EQ,
  },
  {
    label: 'BP',
    field: 'INSTRUMENT_ID',
    value: 'BP',
    serialiser: Serialisers.EQ,
  },
  {
    label: 'LSEG',
    field: 'INSTRUMENT_ID',
    value: 'LSEG',
    serialiser: Serialisers.EQ,
  },
];
const helperCriteriaEvent = (
  criteriaSegmentedControl: any,
  chartDataResource: any,
): (() => void) => {
  const handler = ({ target }: any) => {
    chartDataResource.criteria = target.value;
  };
  criteriaSegmentedControl.addEventListener('change', handler);
  return () => criteriaSegmentedControl.removeEventListener('change', handler);
};

const AnaliticsPage = () => {
  const [ribbonButtonsConfig, setRibbonButtonsConfig] = useState<
    AnalyticChartRegistration[]
  >([]);
  const saveButton = useRef<HTMLButtonElement>(null);
  const loadLayoutButton = useRef<HTMLButtonElement>(null);
  const loadDefaultLayoutButton = useRef<HTMLButtonElement>(null);
  const loadCompactLayoutButton = useRef<HTMLButtonElement>(null);
  const ribbonButtonsRef = useRef<HTMLButtonElement[]>([]);
  const analyticsLayout = useRef<FoundationLayout>(null);
  const pieChartInTab = useRef<G2PlotChart>(null);
  const criteriaInTab = useRef<CriteriaSegmentedControl>(null);
  const pieChart2InTab = useRef<G2PlotChart>(null);
  const pieChartDataSourceInTab = useRef<HTMLElement>(null);
  const areaChartInTab = useRef<G2PlotChart>(null);
  const barChartInTab = useRef<G2PlotChart>(null);
  const columnChartInTab = useRef<G2PlotChart>(null);
  const dualaxesChartInTab = useRef<G2PlotChart>(null);
  const lineChartInTab = useRef<G2PlotChart>(null);
  const roseChartInTab = useRef<G2PlotChart>(null);
  const mixChartInTab = useRef<G2PlotChart>(null);

  const layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();
  const onDestroyActions: (() => void)[] = [];
  const roseLegendParser = ({ series }: { series: string }) => series;
  const addChartToLayout = ({
    registration: registration,
    title: title,
  }: AnalyticChartRegistration) => {
    if (analyticsLayout.current) {
      analyticsLayout.current.addItem({
        registration,
        title,
        closable: true,
      });
    }
  };

  const setChartsConfigAndData = () => {
    layoutComponentsMap.forEach((layoutComponent, key) => {
      const chart = getElementByTagFromComponent(
        layoutComponent,
        'zero-g2plot-chart',
      );
      const chartConfig = chartConfigMap.get(key);
      const chartData = chartDataMap.get(key);

      if (chartConfig) {
        chart.config = chartConfig;
      }

      if (chartData) {
        chart.data = chartData;
      }
    });
  };

  const setLayoutChildrenProps = () => {
    const roseLayoutComponent = layoutComponentsMap.get(
      LayoutComponentsNames.ROSE,
    );
    const roseChart = getElementByTagFromComponent(
      roseLayoutComponent,
      'zero-g2plot-chart',
    );
    roseChart.legendParser = roseLegendParser;

    const pieLayoutComponent = layoutComponentsMap.get(
      LayoutComponentsNames.PIE,
    );
    const criteriaSegmentedControl = getElementByTagFromComponent(
      pieLayoutComponent,
      'criteria-segmented-control',
    );
    criteriaSegmentedControl.criteriaOptions = toolbarOptions;
  };

  const handleEmmitsInsideLayout = () => {
    const pieLayoutComponent = layoutComponentsMap.get(
      LayoutComponentsNames.PIE,
    );
    const criteriaSegmentedControl = getElementByTagFromComponent(
      pieLayoutComponent,
      'criteria-segmented-control',
    );
    const pieChartDataResource = getElementByTagFromComponent(
      pieLayoutComponent,
      'chart-datasource',
    );

    onDestroyActions.push(
      helperCriteriaEvent(criteriaSegmentedControl, pieChartDataResource),
    );
  };

  const upadateRibbonButtons = () => {
    if (analyticsLayout.current) {
      const currentlyAddedItem = FoundationLayout.layoutRequiredRegistrations(
        analyticsLayout.current.getLayout(),
      );

      setRibbonButtonsConfig(
        Array.from(
          analyticsLayout.current.querySelectorAll('zero-layout-item'),
        ).map(({ registration, title }: any) => ({
          registration,
          title,
          enabled: !currentlyAddedItem.includes(registration),
        })),
      );
    }
  };

  const saveLayoutButtonHandler = () => {
    if (analyticsLayout.current) {
      const layout = analyticsLayout.current.getLayout();
      localStorage.setItem(layoutSaveKey, JSON.stringify(layout));
    }
  };

  const setLayout = (config: any) => {
    if (analyticsLayout.current) {
      analyticsLayout.current.loadLayout(JSON.parse(config));
      setChartsConfigAndData();
      setLayoutChildrenProps();
    }
  };

  const loadLayoutButtonHandler = () => {
    const layout = localStorage.getItem(layoutSaveKey);
    if (!layout) return;
    setLayout(layout);
  };

  const loadPredefinedLayout = (layoutName: SavedLayoutKeys) => {
    setLayout(savedLayout[layoutName]);
    upadateRibbonButtons();
  };

  useEffect(() => {
    let removeCriteriaEventListener: () => void;

    if (analyticsLayout.current) {
      setComponentItemsMap(analyticsLayout.current, layoutComponentsMap);

      analyticsLayout.current.addEventListener(
        LayoutEmitEvents.firstLoaded,
        () => {
          setChartsConfigAndData();
          setLayoutChildrenProps();
          handleEmmitsInsideLayout();
          upadateRibbonButtons();
        },
      );

      //tabPanelZero
      if (pieChartInTab.current) {
        pieChartInTab.current.config = pieConfiguration;
        pieChartInTab.current.data = pieData;
      }

      if (criteriaInTab.current) {
        criteriaInTab.current.criteriaOptions = toolbarOptions;
      }

      if (pieChart2InTab.current) {
        pieChart2InTab.current.config = pieConfiguration;
      }

      if (criteriaInTab.current && pieChartDataSourceInTab.current) {
        removeCriteriaEventListener = helperCriteriaEvent(
          criteriaInTab.current,
          pieChartDataSourceInTab.current,
        );
      }

      //tabPanelOne
      if (areaChartInTab.current) {
        areaChartInTab.current.config = areaConfiguration;
      }

      //tabPanelTwo
      if (barChartInTab.current) {
        barChartInTab.current.config = barConfiguration;
        barChartInTab.current.data = barData;
      }

      //tabPanelThree
      if (columnChartInTab.current) {
        columnChartInTab.current.config = columnConfiguration;
      }

      //tabPanelFour
      if (dualaxesChartInTab.current) {
        dualaxesChartInTab.current.config = dualaxesConfiguration;
        dualaxesChartInTab.current.data = [dualaxesData, dualaxesData];
      }

      //tabPanelFive
      if (lineChartInTab.current) {
        lineChartInTab.current.config = lineConfiguration;
      }

      //tabPanelSix
      if (roseChartInTab.current) {
        roseChartInTab.current.config = roseConfiguration;
        roseChartInTab.current.data = roseData;
      }

      //tabPanelSeven
      if (mixChartInTab.current) {
        mixChartInTab.current.config = mixConfiguration;
        mixChartInTab.current.data = [[], []];
      }

      analyticsLayout.current.addEventListener(
        LayoutEmitEvents.itemAdded,
        upadateRibbonButtons,
      );
      analyticsLayout.current.addEventListener(
        LayoutEmitEvents.itemRemoved,
        upadateRibbonButtons,
      );
      analyticsLayout.current.addEventListener(
        LayoutEmitEvents.firstLoaded,
        upadateRibbonButtons,
      );

      if (saveButton.current) {
        saveButton.current.addEventListener('click', saveLayoutButtonHandler);
      }

      if (loadLayoutButton.current) {
        loadLayoutButton.current.addEventListener(
          'click',
          loadLayoutButtonHandler,
        );
      }

      const handleClickLoadDefaultLayout = () =>
        loadPredefinedLayout('DEFAULT_EXTENDED_LAYOUT');
      if (loadDefaultLayoutButton.current) {
        loadDefaultLayoutButton.current.addEventListener(
          'click',
          handleClickLoadDefaultLayout,
        );
      }

      const handleClickLoadCompactLayout = () =>
        loadPredefinedLayout('COMPACT_LAYOUT');
      if (loadCompactLayoutButton.current) {
        loadCompactLayoutButton.current.addEventListener(
          'click',
          handleClickLoadCompactLayout,
        );
      }

      return () => {
        if (removeCriteriaEventListener) {
          removeCriteriaEventListener();
        }

        if (analyticsLayout.current) {
          analyticsLayout.current.removeEventListener(
            LayoutEmitEvents.itemAdded,
            upadateRibbonButtons,
          );
          analyticsLayout.current.removeEventListener(
            LayoutEmitEvents.itemRemoved,
            upadateRibbonButtons,
          );
          analyticsLayout.current.removeEventListener(
            LayoutEmitEvents.firstLoaded,
            upadateRibbonButtons,
          );
        }

        if (saveButton.current) {
          saveButton.current.removeEventListener(
            'click',
            saveLayoutButtonHandler,
          );
        }

        if (loadLayoutButton.current) {
          loadLayoutButton.current.removeEventListener(
            'click',
            loadLayoutButtonHandler,
          );
        }

        if (loadDefaultLayoutButton.current) {
          loadDefaultLayoutButton.current.removeEventListener(
            'click',
            handleClickLoadDefaultLayout,
          );
        }
      };
    }
  }, []);

  return (
    <zero-flex-layout class={style['analytics-page']}>
      <zero-tabs>
        <span slot="start">Charts</span>
        <zero-tab slot="tab">Multiple</zero-tab>
        <zero-tab slot="tab">Server Data - Pie</zero-tab>
        <zero-tab slot="tab">Area Model</zero-tab>
        <zero-tab slot="tab">Bar Model</zero-tab>
        <zero-tab slot="tab">Column Model</zero-tab>
        <zero-tab slot="tab">Dual Axes Model</zero-tab>
        <zero-tab slot="tab">Line Model</zero-tab>
        <zero-tab slot="tab">Rose Model</zero-tab>
        <zero-tab slot="tab">Mix Model</zero-tab>

        <zero-tab-panel slot="tabpanel">
          <div
            className="container"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridAutoRows: 'minmax(5vh, auto)',
            }}
          >
            <div style={{ display: 'block', position: 'relative' }}>
              <zero-button ref={saveButton}>
                <zero-icon variant="solid" name="floppy-disk"></zero-icon>
              </zero-button>
              <zero-button ref={loadLayoutButton}>
                <zero-icon variant="solid" name="table-cells-large"></zero-icon>
              </zero-button>
              <zero-button
                appearance="primary-gradient"
                ref={loadDefaultLayoutButton}
              >
                Default Layout
              </zero-button>
              <zero-button
                appearance="primary-gradient"
                ref={loadCompactLayoutButton}
              >
                Compact Layout
              </zero-button>
              {ribbonButtonsConfig.map((button, index) => (
                <zero-button
                  key={`${button.title}-${index}`}
                  disabled={button.enabled ? null : 'disabled'}
                  ref={ribbonButtonsRef.current[index]}
                >
                  {button.title}
                </zero-button>
              ))}
            </div>
            <div
              style={{
                display: 'block',
                position: 'relative',
                gridRowStart: 2,
                gridRowEnd: 19,
              }}
            >
              <zero-layout
                ref={analyticsLayout}
                auto-save-key="client-app-analytics-layout"
              >
                <zero-layout-region>
                  <zero-layout-region type="vertical">
                    <zero-layout-item
                      title="Positions Area"
                      registration="area"
                      closable
                    >
                      <zero-g2plot-chart type="area">
                        <chart-datasource
                          resourceName="ALL_POSITIONS"
                          server-fields="INSTRUMENT_NAME QUANTITY"
                          is-snapshot="true"
                        ></chart-datasource>
                      </zero-g2plot-chart>
                    </zero-layout-item>
                    <zero-layout-item
                      title="Static Data Bar"
                      registration="bar"
                      closable
                    >
                      <zero-g2plot-chart type="bar"></zero-g2plot-chart>
                    </zero-layout-item>
                    <zero-layout-item
                      title="Positions Line"
                      registration="line"
                      closable
                    >
                      <zero-g2plot-chart type="line">
                        <chart-datasource
                          resourceName="ALL_POSITIONS"
                          server-fields="INSTRUMENT_NAME QUANTITY"
                          isSnapshot="true"
                        ></chart-datasource>
                      </zero-g2plot-chart>
                    </zero-layout-item>
                    <zero-layout-item
                      title="Static Data Rose"
                      registration="rose"
                      closable
                    >
                      <zero-g2plot-chart type="rose"></zero-g2plot-chart>
                    </zero-layout-item>
                  </zero-layout-region>
                  <zero-layout-region type="vertical">
                    <zero-layout-item
                      title="Positions Pie"
                      registration="pie"
                      closable
                    >
                      <criteria-segmented-control
                        style={{ justifyContent: 'center', display: 'flex' }}
                      ></criteria-segmented-control>
                      <zero-g2plot-chart class="container" type="pie">
                        <chart-datasource
                          resourceName="ALL_POSITIONS"
                          server-fields="INSTRUMENT_NAME VALUE"
                          criteria=""
                        ></chart-datasource>
                      </zero-g2plot-chart>
                    </zero-layout-item>
                    <zero-layout-item
                      title="Positions Donut"
                      registration="donut"
                      closable
                    >
                      <zero-g2plot-chart type="donut">
                        <chart-datasource
                          resourceName="ALL_POSITIONS"
                          server-fields="INSTRUMENT_NAME VALUE"
                        ></chart-datasource>
                      </zero-g2plot-chart>
                    </zero-layout-item>
                    <zero-layout-item
                      title="Static Data Stock"
                      registration="stock"
                      closable
                    >
                      <zero-g2plot-chart type="stock"></zero-g2plot-chart>
                    </zero-layout-item>
                    <zero-layout-item
                      title="Positions Column"
                      registration="column"
                      closable
                    >
                      <zero-g2plot-chart type="column">
                        <chart-datasource
                          resourceName="ALL_POSITIONS"
                          server-fields="INSTRUMENT_NAME QUANTITY"
                          isSnapshot="true"
                        ></chart-datasource>
                      </zero-g2plot-chart>
                    </zero-layout-item>
                  </zero-layout-region>
                </zero-layout-region>
              </zero-layout>
            </div>
          </div>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-flex-layout class="flex-row justify-center items-center">
            <h3>Dynamic local data</h3>
            <zero-g2plot-chart
              ref={pieChartInTab}
              class="container"
              type="pie"
            ></zero-g2plot-chart>
            <zero-flex-layout class="flex-column justify-center items-center">
              <h3>Dynamic server data</h3>
              <criteria-segmented-control ref={criteriaInTab}>
                <label slot="label">Filter by instrument name</label>
              </criteria-segmented-control>
              <zero-g2plot-chart
                ref={pieChart2InTab}
                class="container"
                type="pie"
              >
                <chart-datasource
                  ref={pieChartDataSourceInTab}
                  resourceName="ALL_POSITIONS"
                  server-fields="INSTRUMENT_NAME VALUE"
                  criteria=""
                ></chart-datasource>
              </zero-g2plot-chart>
            </zero-flex-layout>
          </zero-flex-layout>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart ref={areaChartInTab} type="area">
            <chart-datasource
              resourceName="ALL_POSITIONS"
              server-fields="INSTRUMENT_NAME QUANTITY"
              isSnapshot="true"
            ></chart-datasource>
          </zero-g2plot-chart>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart ref={barChartInTab} type="bar"></zero-g2plot-chart>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart ref={columnChartInTab} type="column">
            <chart-datasource
              resourceName="ALL_POSITIONS"
              server-fields="INSTRUMENT_NAME QUANTITY"
              isSnapshot="true"
            ></chart-datasource>
          </zero-g2plot-chart>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart
            ref={dualaxesChartInTab}
            type="dualaxes"
          ></zero-g2plot-chart>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart ref={lineChartInTab} type="line">
            <chart-datasource
              resourceName="ALL_POSITIONS"
              server-fields="INSTRUMENT_NAME QUANTITY"
              isSnapshot="true"
            ></chart-datasource>
          </zero-g2plot-chart>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart
            ref={roseChartInTab}
            type="rose"
          ></zero-g2plot-chart>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-g2plot-chart ref={mixChartInTab} type="mix"></zero-g2plot-chart>
        </zero-tab-panel>
      </zero-tabs>
    </zero-flex-layout>
  );
};

export default AnaliticsPage;
