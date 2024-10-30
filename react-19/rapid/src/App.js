import './App.css';
import React, { useState } from 'react';
import { 
  provideDesignSystem, 
  rapidCard, 
  rapidButton,
  rapidTextField,
  rapidCheckbox,
} from '@genesislcap/rapid-design-system';

provideDesignSystem()
  .register(
    rapidCard(),
    rapidButton(),
    rapidTextField(),
    rapidCheckbox()
  );


function App() {
  // State to hold the input value
  const [inputValue, setInputValue] = useState('');
  const [checkboxValue, setCheckboxState] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckboxState(!!event.target.checked);
  };

  return (
    <rapid-card>
      <h2>Genesis Foundation React</h2>
      <p>input value: {inputValue} / checkbox value: {checkboxValue ? 'true' : 'false'}</p>
      <div style={{ padding: '10px', display: 'flex', 'justify-content': 'space-between', 'vertical-align': 'middle', 'align-items': 'center'}}>
      <rapid-text-field
        name='exampleTextField'
        placeholder="Enter Some Text"
        value={inputValue} 
        onInput={handleInputChange}
        style={{ 'margin': ' 0 50px 0 0' }}
      ></rapid-text-field>
      <rapid-checkbox onChange={handleCheckboxChange}></rapid-checkbox>
      </div>
      <rapid-button appearance="accent" onClick={() => console.log(inputValue)}>Click Me</rapid-button>
  </rapid-card>
  );
}

export default App;
