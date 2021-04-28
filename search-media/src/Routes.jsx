import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Comics from "./Comics";
import Tv from "./Tv";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/comics"} />
      </Route>
      <Route path="/comics">
        <Comics />
      </Route>
      <Route exact path={"/tv"}>
        <Tv />
      </Route>
    </Switch>
  );
}
