import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LayersState } from './layers.state';

export const selectLayersFeature = createFeatureSelector<LayersState>('layersState');

export const isLayerVisible = (layerName: string) => createSelector(
  selectLayersFeature,
  (state) => state[layerName] || false
);

export const isAnyLayerVisible = createSelector(
  selectLayersFeature,
  (state) => Object.values(state).some(visible => visible)
);
