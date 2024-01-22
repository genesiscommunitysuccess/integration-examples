import { STATE_CHANGER_CONFIG } from '../../config';

export interface StateChangerState {
  criteria: string;
  resourceName: string;
}

export const initialState: StateChangerState = {
  criteria: STATE_CHANGER_CONFIG.DEFAULT_CRITERIA,
  resourceName: STATE_CHANGER_CONFIG.DEFAULT_RESOURCE_NAME,
};
