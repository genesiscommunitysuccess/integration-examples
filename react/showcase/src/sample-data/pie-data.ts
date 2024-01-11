export const pieConfiguration = {
  width: 600,
  angleField: 'value',
  colorField: 'groupBy',
  radius: 0.75,
  label: {
    type: 'spider',
    labelHeight: 28,
    content: '{name}\n{percentage}',
    style: {
      fill: 'white',
    },
  },
  interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  statistic: {
    title: false,
    content: {
      content: '',
    },
  },
}

export const pieData = [
  { groupBy: 'Exam 1', value: 27 },
  { groupBy: 'Exam 2', value: 25 },
  { groupBy: 'Exam 3', value: 18 },
  { groupBy: 'Exam 4', value: 15 },
  { groupBy: 'Exam 5', value: 10 },
  { groupBy: 'Exam 6', value: 5 },
]
