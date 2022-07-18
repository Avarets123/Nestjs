export namespace UserRegister {
  export const topic = 'user.register.command';

  export class Request {
    login?: string;
    password: string;
    email: string;
  }

  export class Response {
    user: {
      id: number;
      login?: string;
      email: string;
      password: string;
      created: Date;
    };
    token: string;
  }
}
