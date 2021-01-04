import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import routes from "./config/routes";
import SearchBox from './pages/SearchBox';
import ItemList from "./pages/ItemList";
import ItemDetail from './pages/ItemDetail';

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
