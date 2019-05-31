import { observable, action } from "mobx";
import Axios from "axios";


interface User {
  id: Number,
  username: String,
  fullName: String,
  email: String,
  authLevel: Number,
  firstName: String,
  lastName: String,
  middleName: String,
  createdAt: Date,
  upatedAt: Date,
}

interface INewUser {
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  middleName: String,
}


export default class UserStore {
  @observable user: User | {} = {}
  @observable isLoggedIn: Boolean = false

  @action.bound async login(username: String) {

    let response = await Axios.post("/login", {
      username
    })
    console.log(response);


    if (response.data) {
      this.isLoggedIn = true
      this.user = response.data
    }

  }
  @action.bound logout() {
    this.isLoggedIn = false
  }
  @action.bound async newUser(data: INewUser) {
    await Axios.post("/api/user/new", data)
  }
}
