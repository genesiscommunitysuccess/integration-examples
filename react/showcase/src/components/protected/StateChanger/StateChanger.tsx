import { useContext } from 'react';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';
import style from './StateChanger.module.css';

const StateChanger = () => {
  const stateChangerContext = useContext(StateChangerContext);
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined');
  }
  const { state: stateChangerState, updateState } = stateChangerContext;

  let currentCriteria = stateChangerState.criteria;
  let currentResourceName = stateChangerState.resourceName;

  return (
    <section className={style['state-changer']}>
      <zero-text-field
        on-input={(event: Event) =>
          (currentCriteria = (event.target as HTMLInputElement).value)
        }
        value={stateChangerState.criteria}
      ></zero-text-field>
      <zero-button
        appearance="outline"
        on-click={() => updateState({ criteria: currentCriteria })}
      >
        Apply Criteria
      </zero-button>
      <zero-divider orientation="vertical"></zero-divider>
      <zero-text-field
        on-input={(event: Event) =>
          (currentResourceName = (event.target as HTMLInputElement).value)
        }
        value={stateChangerState.resourceName}
      ></zero-text-field>
      <zero-button
        appearance="outline"
        on-click={() => updateState({ resourceName: currentResourceName })}
      >
        Apply Resource
      </zero-button>
    </section>
  );
};

export default StateChanger;
