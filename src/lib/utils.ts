import type { ContactMethods } from "@/lib/types";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "…";
}

export function hasAnyContact(methods: ContactMethods): boolean {
  return Object.values(methods).some((v) => v && v.trim() !== "");
}

export function contactLabel(key: keyof ContactMethods): string {
  const labels: Record<keyof ContactMethods, string> = {
    wechat: "微信",
    whatsapp: "WhatsApp",
    email: "邮箱",
  };
  return labels[key];
}

export function contactHref(key: keyof ContactMethods, value: string): string | null {
  switch (key) {
    case "email":
      return `mailto:${value}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`;
    default:
      return null;
  }
}
