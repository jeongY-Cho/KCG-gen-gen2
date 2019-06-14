import {} from "./NewUser";
import {} from "./NewUser";
import React, { Component } from "react";
import "./App.css";
import stores from "./stores";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import { Provider } from "mobx-react";

import { Navbar } from "./Navbar";
import { New } from "./NewUser";
import { Login } from "./Login";
import Axios from "axios";
import LegRouter from "./Leg/LegRouter";

// @ts-ignore
window.stores = stores;

class App extends Component {
  componentDidMount() {
    Axios.get("../api/user/me", { withCredentials: true })
      .then(response => {
        console.log(response);

        stores.UserStore.isLoggedIn = true;
        stores.UserStore.user = response.data;
      })
      .catch(error => {
        if (error.code === 401) {
          return;
        }
      });
  }

  render() {
    return (
      <Provider {...stores}>
        <Router>
          <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/new" component={New} />
            <Route path="/login" component={Login} />
            <Route path="/leg" component={LegRouter} />
            {/* <Route path="/leg/update" component={updateLeg} />
            <Route path="/leg/new" component={NewLeg} />
            <Route path='/leg/search' component={searchLeg} /> */}

            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const FourOhFour: React.FC<RouteComponentProps> = props => {
  console.log(props.history.location);

  return <>404 ERROR: webpage ({props.history.location.pathname}) not found</>;
};

const Home: React.FC<RouteComponentProps> = props => {
  return <>home</>;
};

export default App;
