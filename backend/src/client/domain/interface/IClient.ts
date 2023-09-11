export interface IClient {
  _id?: any;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  isActive?: boolean;
  cards?: any;
  refreshToken?: string;
}
