import React, { Component, ReactEventHandler } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { UserStore } from "./stores";

interface ILoginProps extends RouteComponentProps {
  UserStore: UserStore;
}

interface ILoginState {
  email: string;
  password: string;
  redirect: boolean;
  error: boolean;
}

@inject("UserStore")
@observer
export class Login extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false,
      error: false
    };
  }

  login = (e?: React.MouseEvent) => {
    this.props.UserStore.login(this.state.email, this.state.password)
      .then(() => {
        this.props.history.goBack();
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    this.login();
  };

  render() {
    let { email, password, redirect, error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {error && <div>incorrect username or password</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={email}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={password}
            onChange={this.onChange}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    );
  }
}
