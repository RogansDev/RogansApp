import React  from "react";
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import Navigation from "./src/navigation";



const App = () => {
 
  return (
    <Provider store={store} children={""}>
      <Navigation />     
    </Provider>
  );
};



export default App;
