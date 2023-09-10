import { IClient } from "./interface/IClient";

export class ClientEntity implements IClient {
    constructor(
        public  _id: string,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password?: string,
        public isActive?: boolean,
        public cards?: any,
        public refreshToken?: string,
    ){}
}