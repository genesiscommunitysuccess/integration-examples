import { useContext } from 'react';
import reactifyWc from 'reactify-wc';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';
import style from './StateChanger.module.css';

const ZeroTextField: any = reactifyWc('zero-text-field');
const ZeroButton: any = reactifyWc('zero-button');

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
      <ZeroTextField
        on-input={(event: Event) =>
          (currentCriteria = (event.target as HTMLInputElement).value)
        }
        value={stateChangerState.criteria}
      ></ZeroTextField>
      <ZeroButton
        appearance="outline"
        on-click={() => updateState({ criteria: currentCriteria })}
      >
        Apply Criteria
      </ZeroButton>
      <zero-divider orientation="vertical"></zero-divider>
      <ZeroTextField
        on-input={(event: Event) =>
          (currentResourceName = (event.target as HTMLInputElement).value)
        }
        value={stateChangerState.resourceName}
      ></ZeroTextField>
      <ZeroButton
        appearance="outline"
        on-click={() => updateState({ resourceName: currentResourceName })}
      >
        Apply Resource
      </ZeroButton>
    </section>
  );
};

export default StateChanger;
