import React, { ReactNode, useState, useMemo, FunctionComponent } from 'react'
import StateChangerContext, {
  StateChangerState,
  StateContextType,
} from './StateChangerContext'
import { STATE_CHANGER_CONFIG } from '../../config'

interface StateChangerProps {
  children: ReactNode
}

const StateChangerProvider: FunctionComponent<StateChangerProps> = ({
  children,
}) => {
  const [state, setState] = useState<StateChangerState>({
    criteria: STATE_CHANGER_CONFIG.DEFAULT_CRITERIA,
    resourceName: STATE_CHANGER_CONFIG.DEFAULT_RESOURCE_NAME,
  })

  const updateState = (newState: Partial<StateChangerState>) => {
    setState((prevState: StateChangerState) => {
      // Create a new state object
      const updatedState: StateChangerState = { ...prevState }

      // Explicitly set each new state property
      for (const key in newState) {
        if (Object.prototype.hasOwnProperty.call(newState, key)) {
          const specificKey = key as keyof StateChangerState
          updatedState[specificKey] = newState[specificKey] as string
        }
      }

      return updatedState
    })
  }

  // Memoize the context value
  const contextValue = useMemo<StateContextType>(
    () => ({
      state,
      updateState,
    }),
    [state],
  )

  return (
    <StateChangerContext.Provider value={contextValue}>
      {children}
    </StateChangerContext.Provider>
  )
}

export default StateChangerProvider
