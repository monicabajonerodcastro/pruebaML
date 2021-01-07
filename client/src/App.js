import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "antd/dist/antd.css";

import routes from "./config/routes";

function App() {
  return (
    <Router>
    <Switch>
      {routes.map((route, index) => (
        <RouterWithSubRoutes key={index} {...route} />
      ))};
    </Switch>
</Router>
  );
}

function RouterWithSubRoutes(route){
  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => <route.component  routes={route.routes}{...props} />} />   
  );
}

export default App;
