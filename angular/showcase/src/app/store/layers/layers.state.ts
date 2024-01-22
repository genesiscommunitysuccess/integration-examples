import { layerNames } from '../../config';

export interface LayersState {
  [key: string]: boolean; // Each key is a layer name, value is its visibility (true/false)
}

export const initialLayersState: LayersState = {
  ...Object.keys(layerNames).reduce((acc, layerName) => ({ ...acc, [layerName]: false }), {}),
};
