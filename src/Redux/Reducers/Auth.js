import { getRoleFromToken } from '../../utils/jwtUtils';
import { LOGIN_SUCCESS, LOGOUT } from '../Actions/authActions';

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
const role = token ? getRoleFromToken(token) : null;

const initialState = {
  user: email || null,
  token: token || null,
  isAuthenticated: !!token,
  role: role,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        role: getRoleFromToken(action.payload.token),
      };

    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        role: null,
      };

    default:
      return state;
  }
};

export default authReducer;
