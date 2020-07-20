import { IUpdateUserPoint } from './actions';
import { UPDATE_USER_POINT } from './types';
import { IUser } from '../../interfaces';
import Users from '../../static/users.json';

export function userReducer(
  state: Array<IUser> = Users,
  action: IUpdateUserPoint
): Array<IUser> {
  switch (action.type) {
    case UPDATE_USER_POINT: {
      return state.map((user) =>
        user.id === action.userId ? { ...user, point: action.point } : user
      );
    }
    default:
      return state;
  }
}
