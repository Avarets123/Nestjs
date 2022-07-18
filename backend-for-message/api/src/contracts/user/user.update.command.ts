export namespace UserUpdate {
  export const topic = 'user.update.command';

  export class Request {
    userId: number;

    userData: {
      email: string;
      login?: string;
      password?: string;
    };
  }

  export class Response {
    id: number;
    login?: string;
    email: string;
    password: string;
    created: Date;
  }
}
