export class CreateMessageGroup {
  groupId: number;
  message: {
    fromUser: number;
    message: string;
    toUser?: number;
  };
}
