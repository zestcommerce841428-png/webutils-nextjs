export interface Category {
  name: string;
  icon: string;
  color: string;
}

export interface Tool {
  path: string;
  name: string;
  category: string;
  keywords: string;
  description?: string;
}

export interface ToolsData {
  categories: Record<string, Category>;
  tools: Tool[];
}

export interface ToolMetadata {
  title: string;
  description: string;
  category: string;
  keywords: string[];
  path: string;
}
