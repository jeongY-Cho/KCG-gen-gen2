import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
export class LegMain extends Component<
  {},
  {
    legs: [];
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      legs: []
    };
  }
  componentDidMount() {
    Axios.get("../api/leg/search").then(response => {
      console.log(response);
      this.setState({
        legs: response.data
      });
    });
  }
  render() {
    let listItems = this.state.legs.map((entry: any) => {
      let grades = entry.Grades.map((grade: any) => {
        return (
          <div className="col col-lg-1 text-center">
            {grade.grade ? (
              grade.grade
            ) : (
              <small className="text-muted">∅</small>
            )}
          </div>
        );
      });
      return (
        <Link
          to={`/leg/${entry.id}`}
          key={entry.id}
          className="list-group-item list-group-item-action"
        >
          <div className="row p-1 justify-content-center">
            <div className="col-3 col-lg-2">
              {entry.title.slice(0, 3)} {entry.district}
            </div>
            <div className="col-9 col-lg ">
              <h6>
                ({entry.party.slice(0, 1)}) {entry.fullName}
              </h6>
            </div>
            {grades}
          </div>
        </Link>
      );
    });
    return (
      <div className="container-fluid">
        <h3>List of things</h3>
        <div className="row">
          <div className="col">
            <div className="row mb-3 mr-1 p-2 border rounded">
              <div className="col-3">District</div>
              <div className="col-9 col-lg">Name</div>
              <div className="col col-lg-1 text-center">
                <abbr title="Donation">D</abbr>
              </div>
              <div className="col col-lg-1 text-center">
                <abbr title="Rhetoric">R</abbr>
              </div>
              <div className="col col-lg-1 text-center">
                <abbr title="Voting">V</abbr>
              </div>
            </div>
            <div className="row">
              <div className="col list-group mx-auto">{listItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
