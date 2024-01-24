import { useRef, useEffect, useContext } from 'react';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';
import style from './StateChanger.module.css';

const StateChanger = () => {
  const stateChangerContext = useContext(StateChangerContext);
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined');
  }
  const { state: stateChangerState, updateState } = stateChangerContext;
  const criteriaTextField = useRef<HTMLInputElement | null>(null);
  const resourceNameTextField = useRef<HTMLInputElement | null>(null);
  const applyCriteriaButton = useRef<HTMLButtonElement | null>(null);
  const applyResourceNameButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const applyCriteria = () => {
      if (criteriaTextField.current) {
        updateState({ criteria: criteriaTextField.current.value });
      }
    };
    const applyResourceName = () => {
      if (resourceNameTextField.current) {
        updateState({ resourceName: resourceNameTextField.current.value });
      }
    };

    if (applyCriteriaButton.current) {
      applyCriteriaButton.current.addEventListener('click', applyCriteria);
    }
    if (applyResourceNameButton.current) {
      applyResourceNameButton.current.addEventListener(
        'click',
        applyResourceName,
      );
    }

    return () => {
      if (applyCriteriaButton.current) {
        applyCriteriaButton.current.removeEventListener('click', applyCriteria);
      }
      if (applyResourceNameButton.current) {
        applyResourceNameButton.current.removeEventListener(
          'click',
          applyResourceName,
        );
      }
    };
  }, []);

  return (
    <section className={style['state-changer']}>
      <zero-text-field
        ref={criteriaTextField}
        value={stateChangerState.criteria}
      ></zero-text-field>
      <zero-button appearance="outline" ref={applyCriteriaButton}>
        Apply Criteria
      </zero-button>
      <zero-divider orientation="vertical"></zero-divider>
      <zero-text-field
        ref={resourceNameTextField}
        value={stateChangerState.resourceName}
      ></zero-text-field>
      <zero-button appearance="outline" ref={applyResourceNameButton}>
        Apply Resource
      </zero-button>
    </section>
  );
};

export default StateChanger;
