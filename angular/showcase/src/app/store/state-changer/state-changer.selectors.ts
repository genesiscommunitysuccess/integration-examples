import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StateChangerState } from './state-changer.state';

export const selectStateChangerFeature = createFeatureSelector<StateChangerState>('stateChangerState');

export const getCriteria = createSelector(
  selectStateChangerFeature,
  (state: StateChangerState) => state.criteria
);

export const getResourceName = createSelector(
  selectStateChangerFeature,
  (state: StateChangerState) => state.resourceName
);