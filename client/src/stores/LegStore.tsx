import { observable, action } from "mobx";
import { IUser } from "./UserStore"
import Axios from "axios";




export interface IGrade {
  id: number,
  type: string,
  grade: string,
  createdAt: string,
  updatedAt: string,
  legislatorId: string,
  setterId: string,
  setter: IUser
}


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
  createdAt: string,
  updatedAt: string,
  grades: IGrade[],
  updatedBy: IUser

}

export default class LegStore {

  @observable legs: ILeg[] = []
  // @ts-ignore
  @observable current: ILeg = {}

  @action.bound async getOne(id: string) {
    let response = await Axios.get("/api/leg", {
      params: {
        id: id
      }
    })
    console.log(response.data);

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

  @action.bound async updateLeg(data: ILeg) {
    let response = await Axios.put(`/api/leg/${data.id}`, data)

    console.log(response.data);

    this.current = response.data
  }

  @action.bound async newLeg(data: ILeg) {
    let response = await Axios.post("/api/leg/new", data)
  }
}

