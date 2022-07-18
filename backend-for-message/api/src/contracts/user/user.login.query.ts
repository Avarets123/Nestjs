export namespace UserLogin {
  export const topic = 'user.login.query';

  export class Request {
    email: string;
    password: string;
  }

  export class Response {
    email: string;
    token: string;
  }
}
