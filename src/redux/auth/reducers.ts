import { IAuthenticate, IUnauthenticate } from './actions';
import { AUTHENTICATE, UNAUTHENTICATE } from './types';
import { IUserAuthData } from '../../interfaces';

export function authReducer(
  state: IUserAuthData = { userName: null, uuid: null, isAuthenticated: false },
  action: IAuthenticate | IUnauthenticate
): IUserAuthData {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userName: 'admin',
        uuid: '38724YJKKKC0921I',
        isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return { userName: null, uuid: null, isAuthenticated: false };
  }
  return state;
}
