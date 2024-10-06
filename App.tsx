import React from "react";
import { StatusBar } from "react-native";
import { initialize } from "react-native-clarity";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import { store } from "./src/state/store";

initialize("lne3hvcd2x");

const App = () => {
  // console.log(process.env.GOOGLE_SERVICES_INFOPLIST, process.env.GOOGLE_SERVICES_JSON);
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
