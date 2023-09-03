export interface IClient {
  id?: any;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  isActive?: boolean;
  cards?: any;
  refreshToken?: string;
}
