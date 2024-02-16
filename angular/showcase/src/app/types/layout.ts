import { layoutComponentName } from '../config';

export type LayoutComponentName =
  | typeof layoutComponentName.default
  | typeof layoutComponentName.blank;
