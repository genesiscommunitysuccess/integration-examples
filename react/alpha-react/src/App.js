import './App.css';
import { useState } from 'react';
import { useCustomEventListener } from './hooks/useCustomEventListener';
import { 
  provideDesignSystem, 
  alphaCard, 
  alphaButton,
  alphaTextField
} from '@genesislcap/alpha-design-system';

provideDesignSystem()
    .register(
        alphaCard(),
        alphaButton(),
        alphaTextField()
    );


function App() {
  const [value, setValue] = useState('');
  const webComponentRef = useCustomEventListener('input', (event) => {
    setValue(event.target.value);
  });

  return (
    <alpha-card>
      <h2>Genesis Foundation React</h2>
      <alpha-text-field name='exampleTextField' placeholder="Enter Some Text" ref={webComponentRef}></alpha-text-field>
      <alpha-button appearance="accent" onClick={() => console.log(value)}>Click Me</alpha-button>
  </alpha-card>
  );
}

export default App;
