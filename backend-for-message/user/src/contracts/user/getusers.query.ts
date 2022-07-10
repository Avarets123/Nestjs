export namespace UserGetAll {
  export const topic = 'users.getAll.query';

  export class Request {}

  export class Response {
    id: number;
    login?: string;
    email: string;
    password: string;
    created: string;
  }
}
