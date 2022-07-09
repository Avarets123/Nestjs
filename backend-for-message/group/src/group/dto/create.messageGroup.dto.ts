export class CreateMessageGroup {
  groupId: number;
  message: ICreateMessage;
}

export interface ICreateMessage {
  fromUser: number;
  message: string;
}
