import { Request } from 'express';

export interface IReqWithUser extends Request {
  user?: { email?: string; id?: number };
}
