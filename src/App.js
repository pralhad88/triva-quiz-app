import React from 'react';
import './App.css';
import { Provider } from 'react-redux'; // imported Provider from react-redux for passing redux store in application
import { SnackbarProvider } from 'notistack'; // imported SnackbarProvider for error handeling.

import AppRouter from './appRoute/index';
import Header from './component/header';
import configureStore from './store/index';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider // toaster is used to error handeler.
        maxSnack={2} 
      >
        <div
          className="App"
        >
          <Header />
          <AppRouter />
        </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
