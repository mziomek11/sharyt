import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Entrance from "./components/Entrance";
import Room from "./components/Room";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { ThemeProvider } from "./styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/room/:roomId" component={Room} />
          <Route exact path="/" component={Entrance} />
          <Route path="/" component={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>{" "}
    </ThemeProvider>
  );
};

export default App;
