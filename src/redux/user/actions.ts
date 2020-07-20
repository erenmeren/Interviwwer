import * as constants from './types';

export interface IUpdateUserPoint {
  type: constants.UPDATE_USER_POINT;
  userId: number;
  point: number;
}

export const updeteUserPoint = (userId: number, point: number) => ({
  type: constants.UPDATE_USER_POINT,
  userId,
  point,
});
