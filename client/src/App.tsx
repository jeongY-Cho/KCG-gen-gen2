import React, { Component } from 'react';
import './App.css';
import stores, { UserStore, LegStore } from "./stores";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, NavLink, Link } from "react-router-dom"
import { Provider } from "mobx-react"
import { inject, observer } from "mobx-react"
import Axios from 'axios';
import { ILeg } from './stores/LegStore';

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
          <Route exact path="/leg" component={Leg} />
          <Route path="/leg/update" component={updateLeg} />
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
      <button onClick={() => props.history.push("/leg")}>legs</button>
      <button onClick={() => props.history.push("/leg/new")}>New leg</button>
      <button onClick={() => props.history.push("/leg/search")}>search leg</button>
      <button onClick={() => Axios.post("/logout")}>logout</button>
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


interface ILegProps extends RouteComponentProps {
  LegStore: LegStore
}

interface ILegState {
  id: string
}

@inject("LegStore") @observer
class Leg extends Component<ILegProps, ILegState> {
  constructor(props: ILegProps) {
    super(props)

    this.state = {
      id: ''
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  getLeg = () => {
    this.props.LegStore.getOne(this.state.id)
  }

  getCard = async () => {

    Axios({
      url: '/generator',
      method: 'GET',
      params: {
        id: this.props.LegStore.current.id
      },
      responseType: 'blob', // important
    }).then((response: any) => {
      console.log(response.headers);

      let filename = response.headers["x-suggested-filename"]
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });

  }
  render() {
    var firstName, lastName, session, district, email, legPage, phoneNum, notes, grades, party;
    var title = ''
    var createdAt = ''
    var updatedAt = ''
    if (this.props.LegStore.current.id) {
      ({ firstName, lastName, title, session, district, email, legPage, phoneNum, notes, createdAt, updatedAt, grades, party } = this.props.LegStore.current)
      console.log(typeof createdAt);

      grades = grades.map((grade) => {
        return (
          <li key={grade.type}>
            {grade.type}: {grade.grade}
          </li>
        )
      })
    }


    return (
      <>
        <input type="text" value={this.state.id} onChange={this.onChange} id="id" placeholder="ID" />
        <button onClick={this.getLeg}>get leg</button>
        <div>first name: {firstName}</div>
        <div>last name: {lastName}</div>
        <div>party: {party}</div>
        <div>session: {session}</div>
        <div>title: {title.toLowerCase()}</div>
        <div>district: {district}</div>
        <div>email: {email}</div>
        <div>legislator webapage: {legPage}</div>
        <div>phone number: {phoneNum}</div>
        <div>grades:
          <ul>
            {grades}

          </ul>
        </div>
        <div>notes: {notes}</div>
        {this.props.LegStore.current.id &&
          <>
            <div>created: {new Date(createdAt).toLocaleDateString()}</div>
            <div>updatedAt: {new Date(updatedAt).toLocaleDateString()}</div>
            <button onClick={this.getCard}>get card</button>
            <Link to="/leg/update">update info</Link>
          </>
        }
      </>
    )
  }
}

interface IUpdateLegProps extends RouteComponentProps {
  LegStore: LegStore,
}
interface IUpdateLegState extends ILeg {

}

@inject("LegStore") @observer
class updateLeg extends Component<IUpdateLegProps, IUpdateLegState> {
  constructor(props: IUpdateLegProps) {
    super(props)


    this.state = {
      id: this.props.LegStore.current.id,
      fullName: this.props.LegStore.current.fullName || '',
      firstName: this.props.LegStore.current.firstName || '',
      middleName: this.props.LegStore.current.middleName || '',
      party: this.props.LegStore.current.party || '',
      imgLink: this.props.LegStore.current.imgLink || '',
      lastName: this.props.LegStore.current.lastName || '',
      title: this.props.LegStore.current.title || '',
      session: this.props.LegStore.current.session || 0,
      district: this.props.LegStore.current.district || 0,
      email: this.props.LegStore.current.email || '',
      legPage: this.props.LegStore.current.legPage || '',
      phoneNum: this.props.LegStore.current.phoneNum || '',
      notes: this.props.LegStore.current.notes || '',
      createdAt: this.props.LegStore.current.createdAt || '',
      updatedAt: this.props.LegStore.current.updatedAt || '',
      grades: this.props.LegStore.current.grades || '',
    }
  }

  update = async () => {
    await this.props.LegStore.updateLeg(this.state)
    this.props.history.push("/leg")
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.id === "title") {
      this.setState({
        title: e.target.value.toUpperCase()
      })
    }
    // @ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    let grades = this.state.grades.slice()

    // @ts-ignore
    grades[e.target.dataset.i] = {
      type: e.target.id,
      grade: e.target.value.toUpperCase().substring(0, 1)
    }
    this.setState({
      grades: grades
    })
  }
  render() {
    var firstName, lastName, session, district, email, legPage, phoneNum, notes, grades, party;
    var title = ''
    var createdAt = ''
    var updatedAt = ''
    if (this.props.LegStore.current.id) {
      ({ firstName, lastName, title, session, district, email, legPage, phoneNum, notes, createdAt, updatedAt, grades, party } = this.state)
      console.log(typeof createdAt);

      grades = grades.map((grade, i) => {
        return (
          <li key={grade.type}>
            {grade.type}: <input type="text" id={grade.type} data-i={i} value={grade.grade} onChange={this.onGradeChange} />
          </li>
        )
      })
    }


    return (
      <>
        <div>first name: <input type="text" onChange={this.onChange} id="firstName" value={firstName} /></div>
        <div>last name: <input type="text" onChange={this.onChange} id="lastName" value={lastName} /></div>
        <div>party: <input type="text" onChange={this.onChange} id="party" value={party} /></div>
        <div>session: <input type="text" onChange={this.onChange} id="session" value={session} /></div>
        <div>title: <input type="text" onChange={this.onChange} id="title" value={title.toLowerCase()} /></div>
        <div>district: <input type="text" onChange={this.onChange} id="district" value={district} /></div>
        <div>email: <input type="text" onChange={this.onChange} id="email" value={email} /></div>
        <div>legislator webapage: <input type="text" onChange={this.onChange} id="legPage" value={legPage} /></div>
        <div>phone number: <input type="text" onChange={this.onChange} id="phoneNum" value={phoneNum} /></div>
        <div>grades:
          <ul>
            {grades}

          </ul>
        </div>
        <div>notes: <input type="text" onChange={this.onChange} id="notes" value={notes} /></div>
        {this.props.LegStore.current.id &&
          <>
            <div>created: {new Date(createdAt).toLocaleDateString()}</div>
            <div>updatedAt: {new Date(updatedAt).toLocaleDateString()}</div>
            <button onClick={this.update}>update</button>
          </>
        }
      </>
    )
  }
}


interface INewLegProps extends RouteComponentProps {
  LegStore: LegStore,
}
interface INewLegState extends ILeg {

}

@inject("LegStore") @observer
class newLeg extends Component<INewLegProps, INewLegState> {
  constructor(props: INewLegProps) {
    super(props)


    this.state = {
      id: 0,
      fullName: this.props.LegStore.current.fullName,
      firstName: this.props.LegStore.current.firstName,
      middleName: this.props.LegStore.current.middleName,
      party: this.props.LegStore.current.party,
      imgLink: this.props.LegStore.current.imgLink,
      lastName: this.props.LegStore.current.lastName,
      title: this.props.LegStore.current.title,
      session: this.props.LegStore.current.session,
      district: this.props.LegStore.current.district,
      email: this.props.LegStore.current.email,
      legPage: this.props.LegStore.current.legPage,
      phoneNum: this.props.LegStore.current.phoneNum,
      notes: this.props.LegStore.current.notes,
      createdAt: this.props.LegStore.current.createdAt,
      updatedAt: this.props.LegStore.current.updatedAt,
      grades: this.props.LegStore.current.grades,
    }
  }

  update = async () => {
    await this.props.LegStore.updateLeg(this.state)
    this.props.history.push("/leg")
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.id === "title") {
      this.setState({
        title: e.target.value.toUpperCase()
      })
    }
    // @ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    let grades = this.state.grades.slice()

    // @ts-ignore
    grades[e.target.dataset.i] = {
      type: e.target.id,
      grade: e.target.value.toUpperCase().substring(0, 1)
    }
    this.setState({
      grades: grades
    })
  }
  render() {
    var firstName, lastName, session, district, email, legPage, phoneNum, notes, grades, party;
    var title = ''
    var createdAt = ''
    var updatedAt = ''
    if (this.props.LegStore.current.id) {
      ({ firstName, lastName, title, session, district, email, legPage, phoneNum, notes, createdAt, updatedAt, grades, party } = this.state)
      console.log(typeof createdAt);

      grades = grades.map((grade, i) => {
        return (
          <li key={grade.type}>
            {grade.type}: <input type="text" id={grade.type} data-i={i} value={grade.grade} onChange={this.onGradeChange} />
          </li>
        )
      })
    }


    return (
      <>
        <div>first name: <input type="text" onChange={this.onChange} id="firstName" value={firstName} /></div>
        <div>last name: <input type="text" onChange={this.onChange} id="lastName" value={lastName} /></div>
        <div>party: <input type="text" onChange={this.onChange} id="party" value={party} /></div>
        <div>session: <input type="text" onChange={this.onChange} id="session" value={session} /></div>
        <div>title: <input type="text" onChange={this.onChange} id="title" value={title.toLowerCase()} /></div>
        <div>district: <input type="text" onChange={this.onChange} id="district" value={district} /></div>
        <div>email: <input type="text" onChange={this.onChange} id="email" value={email} /></div>
        <div>legislator webapage: <input type="text" onChange={this.onChange} id="legPage" value={legPage} /></div>
        <div>phone number: <input type="text" onChange={this.onChange} id="phoneNum" value={phoneNum} /></div>
        <div>grades:
          <ul>
            {grades}

          </ul>
        </div>
        <div>notes: <input type="text" onChange={this.onChange} id="notes" value={notes} /></div>
        {this.props.LegStore.current.id &&
          <>
            <div>created: {new Date(createdAt).toLocaleDateString()}</div>
            <div>updatedAt: {new Date(updatedAt).toLocaleDateString()}</div>
            <button onClick={this.update}>update</button>
          </>
        }
      </>
    )
  }
}




class searchLeg extends Component { }



export default App;
