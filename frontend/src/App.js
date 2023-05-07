import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import ManageSpots from "./components/Spots/ManageSpots";
import UpdateSpot from "./components/Spots/UpdateSpot";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <div className="outer">

      <div className="navigation">
      <Navigation isLoaded={isLoaded} />
      </div>


      {isLoaded &&
      <div className="main">
      <Switch>
        <Route exact path="/">
          <AllSpots />
        </Route>
        <Route exact path="/spots/current">
          <ManageSpots />
        </Route>
        <Route exact path="/spots/new">
          <CreateSpotForm />
        </Route>
        <Route exact path="/spots/:id">
          <SpotDetails />
        </Route>
        <Route exact path="/spots/:id/edit">
          <UpdateSpot />
        </Route>
      </Switch>
      </div>
      }


      </div>
    </>
  );
}

export default App;
