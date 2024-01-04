import React from 'react'

export interface StateChangerState {
  criteria: string
  resourceName: string
}
export interface StateContextType {
  state: StateChangerState
  updateState: (newState: Partial<StateChangerState>) => void
}

const LayerContext = React.createContext<StateContextType | undefined>(
  undefined,
)

export default LayerContext
