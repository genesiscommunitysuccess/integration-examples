import * as SavedLayout from '../../sample-data/saved-layouts';

export type AnalyticChartRegistration = {
  registration: string;
  title: string;
  enabled?: boolean;
};

export enum LayoutComponentsNames {
  PIE = 'pie',
  ROSE = 'rose',
  STOCK = 'stock',
  MIX = 'mix',
  COLUMN = 'column',
  LINE = 'line',
  BAR = 'bar',
  AREA = 'area',
  DONUT = 'donut',
}

export type SavedLayoutsType = typeof SavedLayout;
export type SavedLayoutKeys = keyof SavedLayoutsType;
