import React from 'react';
import { Provider } from 'react-redux';

import StockScreener from '../src/containers/StockScreener';

import store from '../src/redux/store/configureStore';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <StockScreener />
    </Provider>
  );
}

export default App;
