import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../Store/index";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../Store/Actions/auth';
import jwtDecode from "jwt-decode";
import Notifications from 'react-notifications-component';


const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (error) {
    store.dispatch(setCurrentUser({}));
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="onboarding">
          <Notifications isMobile={true} className="mt-md-4"/>
          <Navbar />
          <Main />
        </div>
      </Router>
      
    </Provider>

  );
}

export default App;
