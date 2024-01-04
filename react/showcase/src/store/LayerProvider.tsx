import React, { ReactNode, useState, useMemo, FunctionComponent } from 'react'
import LayerContext, { LayerContextType, LayerState } from './LayerContext'
import { layerNames } from '../config'

interface LayerProviderProps {
  children: ReactNode
}

const LayerProvider: FunctionComponent<LayerProviderProps> = ({ children }) => {
  const [state, setState] = useState<LayerState>({
    ...Object.keys(layerNames).reduce(
      (acc, layerName) => ({ ...acc, [layerName]: false }),
      {},
    ),
  })

  const updateState = (newState: Partial<LayerState>) => {
    setState((prevState) => {
      // Create a new state object
      const updatedState: LayerState = { ...prevState }

      // Explicitly set each new state property
      for (const key in newState) {
        if (Object.prototype.hasOwnProperty.call(newState, key)) {
          const specificKey = key as keyof LayerState
          updatedState[specificKey] = newState[specificKey] as boolean
        }
      }

      return updatedState
    })
  }

  const setLayerState = (layerName: keyof LayerState, state: boolean) => {
    setState(
      (prevState) =>
        ({
          ...prevState,
          [layerName]: state,
        }) as LayerState,
    ) // Type assertion here
  }

  // Memoize the context value
  const contextValue = useMemo<LayerContextType>(
    () => ({
      state,
      updateState,
      setLayerState,
    }),
    [state],
  )

  return (
    <LayerContext.Provider value={contextValue}>
      {children}
    </LayerContext.Provider>
  )
}

export default LayerProvider
