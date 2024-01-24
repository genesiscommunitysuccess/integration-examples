import React from 'react';

export interface StateChangerState {
  criteria: string;
  resourceName: string;
}
export interface StateChangerContextType {
  state: StateChangerState;
  updateState: (newState: Partial<StateChangerState>) => void;
}

const StateChangerContext = React.createContext<
  StateChangerContextType | undefined
>(undefined);

export default StateChangerContext;
