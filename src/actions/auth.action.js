import { SIGN_IN } from "../constants/actions/auth";

export const login = ({ email, password, jwtToken }) => ({
  type: SIGN_IN,
  auth: {
    email,
    password,
    jwtToken,
  },
});
