import React from "react";
import { StatusBar } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import Navigation from "./src/navigation";

const App = () => {
  console.log(process.env.GOOGLE_SERVICES_INFOPLIST, process.env.GOOGLE_SERVICES_JSON);
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
