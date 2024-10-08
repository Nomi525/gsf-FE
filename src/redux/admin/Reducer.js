import { ADMIN_LOGIN, PROFILE_DETAIL } from "./Type";

const initialState = {
  isAdminLogin: false,
  AdminDetails: [],
  token: "",
};

const profileState = {
  ProfileDetails: [],
};

export const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        AdminDetails: action.payload,
        isAdminLogin: true,
        token: action.payload.data,
      };

    default:
      return state;
  }
};

export const ProfileDetails = (state = profileState, action) => {
  switch (action.type) {
    case PROFILE_DETAIL:
      return {
        ...state,
        ProfileDetails: action.payload,
      };
    default:
      return state;
  }
};
