export interface IConversation {
  id: string;
  messages: Message[];
  userIds: string[];
  createdAt: string;
  updatedAt: string;
}

interface Message {
  sender: Sender;
  receiver: Sender;
  message: string;
  date: number;
}

interface Sender {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}
