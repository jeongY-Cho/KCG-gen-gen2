import { observable, action } from "mobx";
import Axios from "axios";


export interface ILeg {
  id: number,
  fullName: string,
  firstName: string,
  lastName: string,
  middleName: string,
  session: number
  title: string,
  district: number,
  party: string,
  imgLink: string,
  email: string,
  legPage: string,
  phoneNum: string,
  notes: string,
  createdAt: Date,
  updatedAt: Date
}

export default class LegStore {
  @observable legs: ILeg[] = []
  @observable current: ILeg | {} = {}

  @action.bound async getOne(id: string) {
    let response = await Axios.get("/api/leg", {
      params: {
        id: id
      }
    })

    this.current = response.data
  }

  @action.bound async getMany(searchParams: any) {
    let response = await Axios.get("api/leg/search", {
      params: {
        ...searchParams
      }
    })

    this.legs = response.data
  }
}

