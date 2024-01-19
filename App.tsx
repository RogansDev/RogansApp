import React from "react";
import { StatusBar } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import Navigation from "./src/navigation";

const App = () => {

  return (
    <>
      <StatusBar backgroundColor="#FCFCFC" barStyle="dark-content" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
};



export default App;
