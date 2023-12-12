import { createReducer, on } from '@ngrx/store';
import * as LayersActions from './layers.actions';
import { initialLayersState } from './layers.state';

export const layersReducer = createReducer(
  initialLayersState,
  on(LayersActions.showLayer, (state, { layerName }) => ({
    ...state,
    [layerName]: true,
  })),
  on(LayersActions.hideLayer, (state, { layerName }) => ({
    ...state,
    [layerName]: false,
  })),
);
