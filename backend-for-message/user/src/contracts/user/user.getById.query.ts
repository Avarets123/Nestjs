export namespace UserGetById {
  export const topic = 'user.getById.query';

  export class Request {
    id: number;
  }

  export class Response {
    id: number;
    login?: string;
    email: string;
    password: string;
    created: Date;
  }
}
