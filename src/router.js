import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Product from './components/ProductList.js'
import Exp from './components/exp.js'
import Main from './main'
import ProductInfo from './containers/ProductInfo/index'
import SellMachine from './containers/SellMachine/index'
import PayInfo from './containers/PayInfo/index'
import MonthDiagram from './containers/MonthDiagram/index'
import Login from './containers/Login/index'
import Register from './containers/Register/index'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/user/login" exact component={Login} />
        <Route path="/user/register" exact component={Register} />
        <Main>
          {/* <Route path="/p" exact component={Exp} /> */}
          <Route path="/productInfo" exact component={ProductInfo} />
          <Route path="/sellMachine" exact component={SellMachine} />
          <Route path="/payInfo" exact component={PayInfo} />
          <Route path="/monthDiagram" exact component={MonthDiagram} />
          <Route path="/" exact component={IndexPage} />
        </Main>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
