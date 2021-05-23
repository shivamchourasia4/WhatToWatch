import "./App.css";
import "./Rest.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Footer from "./components/Footer";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./layout/Home";
import People from "./layout/People";
import SearchLayout from "./layout/SearchLayout";
import Watchlist from "./layout/Watchlist";
import Details from "./layout/Details";
import Suggestions from "./layout/Suggestions";

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/login" exact>
            <Login />
            <Footer />
          </Route>
          <Route path="/register" exact>
            <Register />
            <Footer />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search" exact>
            <SearchLayout />
          </Route>
          <Route path="/details" exact>
            <Details />
          </Route>
          <Route path="/watchlist" exact>
            <Watchlist />
          </Route>
          <Route path="/people" exact>
            <People />
          </Route>
          <Route path="/suggestions" exact>
            <Suggestions />
          </Route>
          <Route path="*" exact>
            <div className="login-page greyback">
              <h1 className="errmsg">ERROR 404!!!</h1>
              <h3>The page that you are looking for is not available!⚡</h3>
            </div>
          </Route>
        </Switch>
      </AnimatePresence>
    </Provider>
  );
}

export default App;
