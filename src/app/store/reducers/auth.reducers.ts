import * as fromAuth from '../actions/auth.actions';
import { User } from 'src/app/models';

export interface AuthState {
  user: User;
}

const initialState = {
  user: null
};

export function authReducer(state = initialState, action: fromAuth.authActions): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: { ...action.user }
      };

    default:
      return state;
  }
}
