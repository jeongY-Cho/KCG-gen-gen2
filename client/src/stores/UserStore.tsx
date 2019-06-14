import React from "react";
import { observable, action } from "mobx";
import Axios from "axios";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Redirect } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyBCxSv9K2t35EqFEnH8ZpYVn4DT43WhZSY",
  authDomain: "kcg-legislator-report-card.firebaseapp.com",
  databaseURL: "https://kcg-legislator-report-card.firebaseio.com",
  projectId: "kcg-legislator-report-card",
  storageBucket: "kcg-legislator-report-card.appspot.com",
  messagingSenderId: "794508163147",
  appId: "1:794508163147:web:b883245997a55895"
};

firebase.initializeApp(firebaseConfig);

export interface IUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  authLevel: Number;
  firstName: string;
  lastName: string;
  middleName: string;
  createdAt: string;
  upatedAt: string;
}

interface INewUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  password: string;
}

export default class UserStore {
  @observable user: IUser | {} = {};
  @observable isLoggedIn: Boolean = false;

  @action.bound async login(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    let token = await firebase.auth().currentUser!.getIdToken();

    Axios.post("/login", { token: token }).then(response => {
      this.isLoggedIn = true;
      this.user = response.data;
    });
  }
  @action.bound async logout() {
    await Axios.post("/logout");
    this.isLoggedIn = false;
    this.user = {};
  }
  @action.bound async newUser(data: INewUser) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    let token = await firebase.auth().currentUser!.getIdToken();

    let response = await Axios.post("/api/user/new", { ...data, token });
    this.isLoggedIn = true;
    this.user = response.data;
  }
}
