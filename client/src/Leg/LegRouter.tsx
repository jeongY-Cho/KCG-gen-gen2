import { Leg } from "./Leg";
import { NewLeg } from "./NewLeg";
import React from "react";

import { Switch, Route, RouteComponentProps } from "react-router-dom";
import { LegMain } from "./LegMain";

export const LegRouter: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);

  return (
    <Switch>
      <Route exact path={`${match.path}`} component={LegMain} />
      <Route exact path={`${match.path}/new`} component={NewLeg} />
      <Route path={`${match.path}/:id`} component={Leg} />
    </Switch>
  );
};

export default LegRouter;
