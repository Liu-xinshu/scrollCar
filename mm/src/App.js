import React from 'react';
import logo from './logo.svg';
import './App.css';
import RouterRoot from './router/index';
import store from '@/store/index';
import {Provider}from 'react-redux';
function App() {
  return (
    <Provider store={store}>
     <RouterRoot/>
    </Provider>
  );
}

export default App;
