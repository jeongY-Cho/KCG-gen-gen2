import React, { Component } from 'react';
import './App.css';
import stores, { UserStore } from "./stores";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, NavLink } from "react-router-dom"
import { Provider } from "mobx-react"
import { inject, observer } from "mobx-react"

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <Router>
        <Route component={Navbar} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Test} />
          <Route exact path="/new" component={NewUserForm} />
          <Route path="/new/confirmation" component={NewUserConfirmation} />
          <Route path="/leg" component={leg} />
          <Route path="/leg/new" component={newLeg} />
          <Route path='/leg/search' component={searchLeg} />

          <Route component={FourOhFour} />
        </Switch>
      </Router>
    </Provider>
  )

}

const Navbar: React.FC<RouteComponentProps> = (props) => {
  return (
    <div>
      <NavLink to="/" >home</NavLink>
      <button onClick={() => props.history.push("/new")}>New User</button>
    </div>
  )
}


interface IHomeProps extends RouteComponentProps {
  UserStore: UserStore
}
interface IHomeState {
  username: string
}

@inject("UserStore") @observer
class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)

    this.state = {
      username: ''
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value
    })
  }

  render() {

    return (
      <>
        {this.props.UserStore.isLoggedIn ?
          <>
            <div>{JSON.stringify(this.props.UserStore.user)}</div>
            <button onClick={() => { this.props.UserStore.logout() }}>logout</button>
          </>
          :
          <>
            <input type="text" value={this.state.username} placeholder="Username" onChange={this.onChange} />
            <button onClick={() => { this.props.UserStore.login(this.state.username) }}>login</button>
          </>
        }
        <button onClick={() => { this.props.history.push("/test") }}>go test</button>
      </>
    )

  }
}

class Test extends Component<RouteComponentProps> {
  render() {
    return (
      <button onClick={() => this.props.history.push("/")}>go home</button>
    )

  }
}


function NewUser(props: RouteComponentProps) {
  console.log(props.match);

  return (
    <Switch>
      <Route exact path="/new" component={NewUserForm} />
      <Route path="/confirmation" component={NewUserConfirmation} />
    </Switch>
  )
}



interface INewUserFormProps extends RouteComponentProps {
  UserStore: UserStore
}

interface INewUserFormState {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  middleName: string
}

@inject("UserStore")
class NewUserForm extends Component<INewUserFormProps, INewUserFormState> {
  constructor(props: INewUserFormProps) {
    super(props)

    this.state = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      middleName: ""
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.UserStore.newUser(this.state)
      .then(() => {
        this.props.history.push("new/confirmation")
      })
      .catch(err => {
        console.log(err.response);

      })
  }

  render() {
    return (
      <div>
        <input type="text" id="username" onChange={this.onChange} placeholder="Username" />
        <input type="text" id="email" onChange={this.onChange} placeholder="Email" />
        <input type="text" id="firstName" onChange={this.onChange} placeholder="First Name" />
        <input type="text" id="lastName" onChange={this.onChange} placeholder="Last Name" />
        <input type="text" id="middleName" onChange={this.onChange} placeholder="Middle Name" />
        <button onClick={this.onClick}>Register</button>
      </div>
    )
  }
}

function NewUserConfirmation(props: RouteComponentProps) {
  return (
    <div>
      New User Created
    </div>
  )
}


const FourOhFour: React.FC<RouteComponentProps> = (props) => {
  return (
    <div>
      mock 404 error
      <button onClick={() => props.history.goBack()}>go back</button>
      <button onClick={() => props.history.push("/")}>go home</button>
    </div>
  )
}


export default App;
