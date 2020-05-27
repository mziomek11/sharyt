import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Entrance from "./components/Entrance";
import Room from "./components/Room";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/room/:roomId" component={Room} />
        <Route path="/" component={Entrance} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
