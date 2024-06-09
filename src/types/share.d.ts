interface ISharedThread {
  id: number;
  threadId: number;
  threadName: string;
  messageId: number;
  messageContent: string;
  sharedKey: string;
  sharedAt: string;
}

type IShare = {
  sharedKey: string;
  sharedAt: string;
};

interface ISharedMessage {
  id: number;
  role: 'ASSISTANT' | 'USER';
  content: string;
  createdAt: string;
  updatedAt: string;
}
