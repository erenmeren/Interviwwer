// You can sparete different file future

export interface IUserAuthData {
  isAuthenticated: boolean;
  uuid: string | null;
  userName: string | null;
}

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  point: number;
  complatedTaskIds: Array<number>;
}

export interface IState {
  userAuthData: IUserAuthData;
  users: Array<IUser>;
}
