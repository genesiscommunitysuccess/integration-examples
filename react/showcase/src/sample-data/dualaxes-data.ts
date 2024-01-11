export const dualaxesData = [
  { type: '1991', value: 3, count: 10 },
  { type: '1992', value: 4, count: 4 },
  { type: '1993', value: 3.5, count: 5 },
  { type: '1994', value: 5, count: 5 },
  { type: '1995', value: 4.9, count: 4.9 },
  { type: '1996', value: 6, count: 35 },
  { type: '1997', value: 7, count: 7 },
  { type: '1998', value: 9, count: 1 },
  { type: '1999', value: 13, count: 20 },
]

export const dualaxesConfiguration = {
  width: 700,
  xField: 'type',
  yField: ['value', 'count'],
  geometryOptions: [
    {
      geometry: 'line',
      color: '#5B8FF9',
    },
    {
      geometry: 'line',
      color: '#5AD8A6',
    },
  ],
}
