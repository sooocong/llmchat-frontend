import React from 'react';
import { Main } from './pages/Main';
import { ThreadContextProvider } from './context';

function App() {
  return (
    <ThreadContextProvider>
      <Main />
    </ThreadContextProvider>
  );
}

export default App;
