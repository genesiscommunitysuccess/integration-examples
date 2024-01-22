export const lineData = [
  {
    groupBy: '2010-01',
    value: 1998,
  },
  {
    groupBy: '2010-02',
    value: 1850,
  },
  {
    groupBy: '2010-03',
    value: 1720,
  },
  {
    groupBy: '2010-04',
    value: 1818,
  },
  {
    groupBy: '2010-05',
    value: 1920,
  },
  {
    groupBy: '2010-06',
    value: 1802,
  },
  {
    groupBy: '2010-07',
    value: 1945,
  },
  {
    groupBy: '2010-08',
    value: 1856,
  },
  {
    type: '2010-09',
    value: 2107,
  },
  {
    groupBy: '2010-10',
    value: 2140,
  },
  {
    groupBy: '2010-11',
    value: 2311,
  },
  {
    groupBy: '2010-12',
    value: 1972,
  },
  {
    groupBy: '2011-01',
    value: 1760,
  },
  {
    groupBy: '2011-02',
    value: 1824,
  },
  {
    groupBy: '2011-03',
    value: 1801,
  },
];

export const lineConfiguration = {
  width: 700,
  padding: 'auto',
  xField: 'groupBy',
  yField: 'value',
  xAxis: {
    // type: 'timeCat',
    tickCount: 5,
  },
};

export const multiLineConfiguration = {
  ...lineConfiguration,
  seriesField: 'series',
};
