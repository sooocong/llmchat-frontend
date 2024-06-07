interface IThread {
  id: number;
  chatName: string;
  createdAt: string;
  updatedAt: string;
}

type SortType = 'asc' | 'desc';

interface IMessage {
  id: number;
  role: 'ASSISTANT' | 'USER';
  content: string;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ISearch {
  id: number;
  chatName: string;
  matchHighlight: string;
  createdAt: string;
  updatedAt: string;
}
