import UserStore from "./UserStore"
import LegStore from "./LegStore"

export default {
  UserStore: new UserStore(),
  LegStore: new LegStore()
}

export {
  UserStore,
  LegStore
}