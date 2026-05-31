import picksData from "../../content/picks/index.json";

export type PickSource = "factory_direct" | "gigab2b" | "1688";
export type PickSaturation = "blue_ocean" | "medium" | "red_ocean";
export type PickStatus = "published" | "draft";

export interface Pick {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  verdict: string;
  costPrice: number;
  suggestedRetail: number;
  marginPct: number;
  moq: number;
  source: PickSource;
  sourceUrl: string;
  saturation: PickSaturation;
  delivery: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  status: PickStatus;
}

export const SOURCE_LABELS: Record<PickSource, string> = {
  factory_direct: "工厂直供",
  gigab2b: "GigaB2B",
  "1688": "1688严选",
};

export const SATURATION_LABELS: Record<PickSaturation, string> = {
  blue_ocean: "蓝海",
  medium: "中等",
  red_ocean: "红海",
};

export const SATURATION_COLORS: Record<PickSaturation, string> = {
  blue_ocean: "#60a5fa",
  medium: "#fbbf24",
  red_ocean: "#f87171",
};

export const SOURCE_COLORS: Record<PickSource, string> = {
  factory_direct: "#4ade80",
  gigab2b: "#a78bfa",
  "1688": "#fb923c",
};

/** Days threshold for "新" badge */
const NEW_DAYS = 7;

export function isNew(createdAt: string): boolean {
  const diff = Date.now() - new Date(createdAt).getTime();
  return diff < NEW_DAYS * 24 * 60 * 60 * 1000;
}

export function getPicks(): Pick[] {
  return (picksData as Pick[]).filter((p) => p.status === "published");
}

export function getAllCategories(picks: Pick[]): string[] {
  return [...new Set(picks.map((p) => p.category))].sort();
}
