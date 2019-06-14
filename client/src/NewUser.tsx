import React, { Component, ChangeEvent } from "react";
import { Route, Switch, RouteComponentProps, Redirect } from "react-router-dom";
import { UserStore } from "./stores";
import { inject, observer } from "mobx-react";

const NewUserConfirmation: React.FC = props => {
  return <>NewUserConfirmation</>;
};

interface INewUserForm extends RouteComponentProps {
  UserStore: UserStore;
}

@inject("UserStore")
@observer
class NewUserForm extends Component<INewUserForm> {
  state: {
    email: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    redirect: boolean;
    confirm: string;
    checkConfirm: boolean;
  };

  constructor(props: INewUserForm) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirm: "",
      firstName: "",
      middleName: "",
      lastName: "",
      username: "",
      redirect: false,
      checkConfirm: false
    };
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state);
    let {
      email,
      password,
      confirm,
      firstName,
      middleName,
      lastName,
      username
    } = this.state;

    if (
      email &&
      password &&
      confirm &&
      lastName &&
      username &&
      password === confirm
    ) {
      this.props.UserStore.newUser(this.state)
        .then(() => {
          this.setState({
            redirect: true
          });
        })
        .catch(error => {});
    } else if (password !== confirm) {
      this.setState({
        checkConfirm: true
      });
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    let {
      email,
      password,
      firstName,
      middleName,
      lastName,
      username,
      confirm,
      checkConfirm,
      redirect
    } = this.state;

    if (redirect) {
      return <Redirect to="new/confirmation" />;
    }

    let disabled = true;
    if (email && password.length >= 6 && lastName && confirm && username) {
      disabled = false;
    }
    return (
      <div className="p-2">
        <div>Fields marked with * are required</div>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col">
              <InputField
                id="email"
                onChange={this.onChange}
                value={email}
                type="email"
                label="Email"
                required={true}
              />
              <InputField
                id="password"
                required={true}
                onChange={this.onChange}
                type="password"
                value={password}
                label="password (must be 6 or more characters)"
              />
              <InputField
                id="confirm"
                type="password"
                onChange={this.onChange}
                value={confirm}
                label="Retype Password"
                required={true}
              >
                {checkConfirm && (
                  <div className="border border-danger rounded px-1">
                    Passwords don't match
                  </div>
                )}
              </InputField>
              <InputField
                type="text"
                id="username"
                onChange={this.onChange}
                value={username}
                label="Username"
                required={true}
              />
            </div>
            <div className="col">
              <InputField
                type="text"
                id="firstName"
                onChange={this.onChange}
                value={firstName}
                label="First Name"
              />
              <InputField
                type="text"
                id="middleName"
                onChange={this.onChange}
                value={middleName}
                label="Middle Name"
              />
              <InputField
                type="text"
                id="lastName"
                onChange={this.onChange}
                value={lastName}
                label="Last Name"
                required={true}
              />
            </div>
          </div>
          <button
            className="btn btn-block btn-primary"
            type="submit"
            disabled={disabled}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

const InputField: React.FC<{
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  id: string;
  children?: any;
}> = ({
  onChange,
  value,
  id,
  label,
  placeholder = "",
  required = false,
  children,
  type
}) => {
  let formattedPlaceholder: string;
  if (placeholder) {
    formattedPlaceholder =
      placeholder.slice(0, 1).toUpperCase() +
      placeholder.slice(1).toLowerCase() +
      ":";
    if (required) {
      formattedPlaceholder += " *";
    }
  }
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id}>
          {label.slice(0, 1).toUpperCase() + label.slice(1).toLowerCase()}:
          {required ? " *" : ""}
        </label>
      )}
      <input
        type={type}
        className="form-control"
        id={id}
        onChange={onChange}
        value={value}
        placeholder={formattedPlaceholder!}
      />
      {children}
    </div>
  );
};
export const New: React.FC<RouteComponentProps> = ({ match }) => {
  console.log(match);
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}`} component={NewUserForm} />
        <Route
          path={`${match.path}/confirmation`}
          component={NewUserConfirmation}
        />
      </Switch>
    </>
  );
};
