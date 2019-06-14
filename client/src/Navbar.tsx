import React, { Component } from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import Axios from "axios";
import { inject, observer } from "mobx-react";
import { UserStore, LegStore } from "./stores";

export interface INavbarProps extends RouteComponentProps {
  UserStore: UserStore;
  LegStore: LegStore;
}

@inject("UserStore", "LegStore")
@observer
export class Navbar extends Component<INavbarProps> {
  constructor(props: INavbarProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavLink to="/">home</NavLink>
        <button onClick={() => this.props.history.push("/new")}>
          New User
        </button>
        <button onClick={() => this.props.history.push("/leg")}>legs</button>
        <button onClick={() => this.props.history.push("/leg/new")}>
          New leg
        </button>
        <span>{this.props.LegStore.session}</span>
        {this.props.UserStore.isLoggedIn ? (
          <button onClick={() => this.props.UserStore.logout()}>logout</button>
        ) : (
          <button onClick={() => this.props.history.push("/login")}>
            Login
          </button>
        )}
      </div>
    );
  }
}
