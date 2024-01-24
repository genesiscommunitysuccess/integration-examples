import React from 'react';

export interface LayerState {
  [key: string]: boolean
}
export interface LayerContextType {
  state: LayerState
  updateState: (newState: Partial<LayerState>) => void
  setLayerState: (layerName: keyof LayerState, state: boolean) => void
}

const LayerContext = React.createContext<LayerContextType | undefined>(
  undefined,
);

export default LayerContext;
