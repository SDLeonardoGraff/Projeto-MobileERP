import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GlobalProvider } from './src/GlobalContext';
import Routes from './src/routes/StackNav';

export default function App() {
  return (
    <GlobalProvider>
      <Routes />
      <StatusBar style="auto" />
    </GlobalProvider>
  );
};
