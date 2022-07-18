import { DeleteResult } from 'typeorm';

export namespace UserDelete {
  export const topic = 'user.delete.command';

  export class Request {
    userId: number;
  }

  export class Response extends DeleteResult {}
}
