

import React, { useState,  } from 'react';
import LayerContext from './LayerContext';
import { layerNames } from '../config';
import { LayersState, LayerContextState } from '../types/layers';

const initialLayersState: LayersState = {
  ...Object.keys(layerNames).reduce((acc, layerName) => ({ ...acc, [layerName]: false }), {}),
};

interface LayerProviderProps {
  children: React.ReactNode;
}

const LayerProvider: React.FC<LayerProviderProps> = ({ children }) => {
  const [state, setState] = useState<LayerContextState['state']>(initialLayersState);

  const updateState = (newState: Partial<LayerContextState['state']>) => {
    setState((prevState) => ({ ...prevState, ...newState } as LayersState));
  };

  const setLayerState = (layerName: string, isVisible: boolean) => {
    updateState({ [layerName]: isVisible });
  };

  return (
    <LayerContext.Provider value={{ state, updateState, setLayerState }}>
      {children}
    </LayerContext.Provider>
  );
};

export default LayerProvider;

