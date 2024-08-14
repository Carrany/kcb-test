import {
  CREATE_USERS_API,
  EDIT_USER_API,
  FETCH_USERS_API,
  LOGIN_API,
  LOGOUT_API,
  SEARCH_USER_API,
} from "_constants";
import { bomaYanguRequest } from "_helpers";

const login = (data = { username: "", password: "" }) => {
  return bomaYanguRequest.post(LOGIN_API, data);
};

const logout = () => {
  return bomaYanguRequest.post(LOGOUT_API);
};

const fetchUsers = (data) => {
  return bomaYanguRequest.post(FETCH_USERS_API, data);
};

const createUser = (
  data = {
    usrFirstname: "",
    usrLastname: "",
    usrUsername: "",
  }
) => {
  return bomaYanguRequest.post(CREATE_USERS_API, data);
};

const editUser = (
  data = {
    usrId: "",
    usrFirstname: "",
    usrLastname: "",
    usrUsername: "",
    usrStatus: "",
  }
) => {
  return bomaYanguRequest.post(EDIT_USER_API, data);
};

const searchUser = (data = { usrUsername: "" }) => {
  return bomaYanguRequest.post(SEARCH_USER_API, data);
};

export const bomaYanguService = {
  login,
  logout,
  fetchUsers,
  createUser,
  editUser,
  searchUser,
};
