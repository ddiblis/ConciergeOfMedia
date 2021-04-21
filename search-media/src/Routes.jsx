import React from "react"
import { Route, Switch, Redirect } from "react-dom"
import Comics from "./Comics"
import Tv from "./Tv"


export default function Routes(){

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/comics"} />
      </Route>
      <Route exac path="/comics">
        <Comics />
      </Route>
      <Route exact path={"/tv"}>
        <Tv />
      </Route>
    </Switch>
  )
}