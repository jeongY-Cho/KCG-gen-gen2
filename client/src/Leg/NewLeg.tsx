import React, { Component, FormEvent } from "react";
import { RouteComponentProps } from "react-router";
import Axios from "axios";
import { inject, observer } from "mobx-react";
import { LegStore } from "../stores";

export interface LegData {
  id?: number;
  fullName?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  session: string;
  district: string;
  party: string;
  imgLink: string;
  email: string;
  legPage: string;
  phoneNum: string;
  notes: string;
  lastGenerated: string;
  createdAt: string;
  updatedAt: string;
  UserId?: number;
  User: User;
  Grades: Grade[];
}

export interface Grade {
  id?: number;
  type: string;
  grade: string | null;
  createdAt?: string;
  updatedAt?: string;
  LegislatorId?: number;
  UserId?: number;
  User?: User;
}

export interface User {
  id: number;
  username: string;
  uid: string;
  fullName: string;
  email: string;
  authLevel: string;
  firstName: string;
  lastName: string;
  middleName: string;
  createdAt: string;
  updatedAt: string;
}

interface props extends RouteComponentProps<{ id: string }> {
  LegStore: LegStore;
}
interface state extends LegData {
  legId: string;
}

@inject("LegStore")
@observer
export class NewLeg extends Component<props, state> {
  constructor(props: props) {
    super(props);

    console.log(this.props.match.params);

    this.state = {
      legId: this.props.match.params.id,
      firstName: "",
      lastName: "",
      middleName: "",
      title: "",
      session: "",
      district: "",
      party: "",
      imgLink: "",
      email: "",
      legPage: "",
      phoneNum: "",
      notes: "",
      lastGenerated: "",
      createdAt: "",
      updatedAt: "",
      User: {} as User,
      Grades: [
        { type: "Donation", grade: "" },
        { type: "Rhetoric", grade: "" },
        { type: "Voting", grade: "" }
      ]
    };
  }

  onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { firstName, lastName, title, district, party } = this.state;
    if (!firstName || !lastName || !title || !district || !party) {
      if (!firstName) {
        // TODO: proper warning
        console.log("need firstName");
      }
      if (!lastName) {
        // TODO: proper warning
        console.log("need lastName");
      }
      if (!title) {
        // TODO: proper warning
        console.log("need title");
      }
      if (!district) {
        // TODO: proper warning
        console.log("need district");
      }
      if (!party) {
        // TODO: proper warning
        console.log("need party");
      }

      return;
    }

    let { legId, Grades, createdAt, updatedAt, ...rest } = this.state;

    let formattedGrades: { [e: string]: any } = {};

    for (let each in rest) {
      console.log(each);

      // @ts-ignore
      if (rest[each] === "") {
        // @ts-ignore
        rest[each] = null;
      }
    }
    console.log(rest);

    for (let each of Grades) {
      formattedGrades[each.type] = each.grade;
    }
    console.log(formattedGrades);
    console.log(this.props.LegStore.session);

    Axios.post(
      "/api/leg/new",
      {
        session: this.props.LegStore.currentSession,
        Grades: formattedGrades,
        ...rest
      },
      {
        withCredentials: true
      }
    ).then(response => {
      this.props.history.push("/leg/" + response.data.id);
    });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //@ts-ignore
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.dataset.i);

    let newGrades = this.state.Grades.slice();
    //@ts-ignore
    newGrades[e.target.dataset.i].grade = e.target.value;

    this.setState({
      // @ts-ignore
      Grades: newGrades
    });
  };

  render() {
    console.log(this.state);

    let {
      firstName,
      middleName,
      lastName,
      party,
      title,
      district,
      Grades,
      phoneNum,
      email,
      imgLink,
      legPage
    } = this.state;

    return (
      <form className="p-2" onSubmit={this.onSubmit}>
        <div>Fields marked wtih * are required</div>
        <div className="form-row">
          <div className="col-md form-group">
            <label htmlFor="first">First Name *</label>
            <input
              required
              onChange={this.onChange}
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
            />
          </div>
          <div className="col-md form-group">
            <label htmlFor="middle">Middle Name</label>
            <input
              onChange={this.onChange}
              type="text"
              className="form-control"
              id="middleName"
              name="middleName"
              value={middleName}
            />
          </div>
          <div className="col-md form-group">
            <label htmlFor="last">Last Name *</label>
            <input
              required
              onChange={this.onChange}
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="party">Party *</label>
              <select
                required
                className="form-control custom-select"
                id="party"
                name="party"
                value={party}
                onChange={this.onChange}
              >
                <option value="">Pick Party</option>
                <option value="DEMOCRAT">Democrat</option>
                <option value="REPUBLICAN">Republican</option>
                <option value="INDEPENDENT">Independent</option>
              </select>
            </div>
          </div>
          <div className="col-md">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <select
                required
                className="form-control custom-select"
                id="title"
                name="title"
                value={title}
                onChange={this.onChange}
              >
                <option value="">Pick Title</option>
                <option value="REPRESENTATIVE">Representative</option>
                <option value="SENATOR">Senator</option>
              </select>
            </div>
          </div>
          <div className="col-md">
            <label htmlFor="district">District *</label>
            <input
              onChange={this.onChange}
              type="text"
              className="form-control"
              id="district"
              name="district"
              value={district}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md border rounded m-1">
            <label>Donation</label>
            <div className="form-group pl-3">
              <div className="row">
                {["A", "B", "C", "D", "F", "∅"].map((letter, i) => {
                  let checked = false;
                  if (letter === "∅" && Grades[0].grade === null) {
                    checked = true;
                  } else if (Grades[0].grade === letter) {
                    checked = true;
                  }
                  return (
                    <div
                      key={i}
                      className="custom-control custom-radio custom-control-inline col"
                    >
                      <input
                        onChange={this.onRadioChange}
                        className="custom-control-input"
                        type="radio"
                        name="Donation"
                        id={"donation" + letter}
                        value={letter}
                        data-i={0}
                        checked={checked}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={"donation" + letter}
                      >
                        {letter}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md border rounded m-1">
            <label>Rhetoric</label>
            <div className="form-group pl-3 row">
              {["A", "B", "C", "D", "F", "∅"].map((letter, i) => {
                let checked = false;
                if (letter === "∅" && Grades[1].grade === null) {
                  checked = true;
                } else if (Grades[1].grade === letter) {
                  checked = true;
                }
                return (
                  <div
                    key={i}
                    className="custom-control custom-radio custom-control-inline col"
                  >
                    <input
                      onChange={this.onRadioChange}
                      className="custom-control-input"
                      type="radio"
                      name="Rhetoric"
                      id={"rhetoric" + letter}
                      value={letter}
                      data-i={1}
                      checked={checked}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={"rhetoric" + letter}
                    >
                      {letter}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md border rounded m-1">
            <label>Voting</label>
            <div className="form-group pl-3">
              <div className="row">
                {["A", "B", "C", "D", "F", "∅"].map((letter, i) => {
                  let checked = false;
                  if (letter === "∅" && Grades[2].grade === null) {
                    checked = true;
                  } else if (Grades[2].grade === letter) {
                    checked = true;
                  }
                  return (
                    <div
                      key={i}
                      className="custom-control custom-radio custom-control-inline col"
                    >
                      <input
                        onChange={this.onRadioChange}
                        className="custom-control-input"
                        type="radio"
                        name="Voting"
                        id={"voting" + letter}
                        value={letter}
                        data-i={2}
                        checked={checked}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={"voting" + letter}
                      >
                        {letter}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md">
            <div className="form-group">
              <label htmlFor="phoneNum">Phone Num.</label>
              <input
                onChange={this.onChange}
                type="text"
                className="form-control"
                id="phoneNum"
                name="phoneNum"
                value={phoneNum || ""}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.onChange}
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email || ""}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="imgLink">Portrait Link</label>
              <input
                onChange={this.onChange}
                type="text"
                className="form-control"
                id="imgLink"
                name="imgLink"
                value={imgLink || ""}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="legPage">Link Legislator webpage</label>
              <input
                onChange={this.onChange}
                type="text"
                className="form-control"
                id="legPage"
                name="legPage"
                value={legPage || ""}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md">
            <button type="reset" className="btn-warning btn col">
              Reset
            </button>
          </div>
          <div className="col-md">
            <button type="submit" className="btn btn-primary col">
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}
