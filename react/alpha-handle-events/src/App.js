import React, { useRef } from 'react';
import './App.css';

function App() {
  const flyoutRef = useRef(null);

  const showFlyout = () => {
    flyoutRef.current.closed = false;
  };

  const hideFlyout = () => {
    flyoutRef.current.closed = true;
  };

  return (
    <div className="content">
      <button onClick={showFlyout}>Show Flyout</button>
      <alpha-flyout
        ref={flyoutRef}
        position="right"
        onClosed={hideFlyout}
      >
        Flyout content
      </alpha-flyout>
    </div>
  );
}

export default App;