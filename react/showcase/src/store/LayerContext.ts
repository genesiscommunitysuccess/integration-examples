import React from 'react';
import { LayerContextState } from '../types/layers';

const LayerContext = React.createContext<LayerContextState | undefined>(undefined);

export default LayerContext;
