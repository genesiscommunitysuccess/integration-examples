import { createReducer, on } from '@ngrx/store';
import * as StateChangerActions from './state-changer.actions';
import { initialState } from './state-changer.state';

export const stateChangerReducer = createReducer(
  initialState,
  on(StateChangerActions.setCriteria, (state, { criteria }) => ({
    ...state,
    criteria,
  })),
  on(StateChangerActions.setResourceName, (state, { resourceName }) => ({
    ...state,
    resourceName,
  })),
);
