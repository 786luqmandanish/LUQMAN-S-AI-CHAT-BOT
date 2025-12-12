import { ChatHistoryItem, Suggestion } from './types';

export const AI_RESPONSES = [
  "That's a fascinating inquiry. Let's deconstruct the core components logically.",
  "LUQMAN'S AI suggests utilizing a first-principles approach here. Let me explain.",
  "I've analyzed the request. Here is a structured breakdown based on current best practices.",
  "Interesting perspective. Let's evaluate the trade-offs involved in this scenario.",
  "To solve this, we should look at the underlying data structures first.",
  "I'm generating a comprehensive analysis. One moment, please.",
];

export const MOCK_HISTORY: ChatHistoryItem[] = [
  { id: '1', title: 'Quantum Computing Basics', date: 'Today' },
  { id: '2', title: 'React vs Angular Debate', date: 'Yesterday' },
  { id: '3', title: 'Explain HashMaps', date: 'Previous 7 Days' },
  { id: '4', title: 'System Design Interview', date: 'Previous 7 Days' },
  { id: '5', title: 'CSS Grid Layouts', date: 'Previous 30 Days' },
];

export const SUGGESTIONS: Suggestion[] = [
  { id: 's1', text: 'Explain OOP concepts in simple terms' },
  { id: 's2', text: 'Debug this React useEffect hook' },
  { id: 's3', text: 'Summarize the key points of this PDF' },
  { id: 's4', text: 'Generate an optimized SQL query' },
];