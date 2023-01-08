import Header from './Header';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React from "react";
import CreateAccount from "../src/components/user/Registration"
import LoginPage from "../src/components/user/login"
import Home from "../src/components/Home/Home"
import Cart from "../src/components/card/card"
import Order from "../src/components/order/order"
import Address from "../src/components/card/Address"
import OrderList from "../src/components/order/orderList"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = "/createAccout"><CreateAccount/></Route>
          <Route exact path = "/login"><LoginPage/></Route>
          <Route path = "/home"><Home/></Route>
          <Route path = "/cart"><Cart/></Route>
          <Route path = "/address"><Address/></Route>
          <Route path = "/order"><Order/></Route>
          <Route path = "/myOrder"><OrderList/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
