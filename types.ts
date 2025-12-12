export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  groundingChunks?: GroundingChunk[];
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
}

export interface Suggestion {
  id: string;
  text: string;
  icon?: string;
}