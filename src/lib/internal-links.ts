// Phase 9: Internal linking types and utilities
// Supports content node graph for cross-silo linking

export type ContentNodeType =
  | "blog-article"
  | "cost-guide"
  | "material-guide"
  | "problem"
  | "hub"
  | "service"
  | "city";

export interface ContentNode {
  slug: string;
  title: string;
  path: string;
  type: ContentNodeType;
  description?: string;
  silo?: string;
}

export interface InternalLink {
  title: string;
  path: string;
  type: ContentNode["type"];
  description?: string;
}
