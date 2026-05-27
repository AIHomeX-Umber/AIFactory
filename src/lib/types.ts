export type ContactMethods = {
  wechat?: string;
  whatsapp?: string;
  email?: string;
  telegram?: string;
  x?: string;
};

export type Profile = {
  id: string;
  name: string | null;
  avatar_url: string | null;
  bio: string | null;
  links: Record<string, string>;
  contact_methods: ContactMethods;
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  category: string | null;
  tags: string[];
  attachments: string[];
  contact_methods: ContactMethods;
  related_workflows: string[];
  related_requests: string[];
  opportunity_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: "draft" | "published" | "archived";
  saved_count: number;
  profiles?: Pick<Profile, "id" | "name" | "avatar_url">;
};

export type Request = {
  id: string;
  title: string;
  description: string;
  budget: string | null;
  channel: string | null;
  tags: string[];
  contact_methods: ContactMethods;
  related_workflows: string[];
  related_offers: string[];
  opportunity_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: "draft" | "published" | "archived";
  saved_count: number;
  profiles?: Pick<Profile, "id" | "name" | "avatar_url">;
};

export type Workflow = {
  id: string;
  title: string;
  description: string;
  workflow_type: string | null;
  steps: unknown[];
  tools: string[];
  tags: string[];
  prompt_blocks: unknown[];
  attachments: string[];
  contact_methods: ContactMethods;
  related_offers: string[];
  related_requests: string[];
  opportunity_id: string | null;
  forked_from: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  status: "draft" | "published" | "archived";
  saved_count: number;
  fork_count: number;
  profiles?: Pick<Profile, "id" | "name" | "avatar_url">;
};

export type ObjectType = "offer" | "request" | "workflow";

export type Save = {
  id: string;
  user_id: string;
  object_type: ObjectType;
  object_id: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      offers: { Row: Offer; Insert: Omit<Offer, "id" | "created_at" | "updated_at" | "saved_count">; Update: Partial<Offer> };
      requests: { Row: Request; Insert: Omit<Request, "id" | "created_at" | "updated_at" | "saved_count">; Update: Partial<Request> };
      workflows: { Row: Workflow; Insert: Omit<Workflow, "id" | "created_at" | "updated_at" | "saved_count" | "fork_count">; Update: Partial<Workflow> };
      saves: { Row: Save; Insert: Omit<Save, "id" | "created_at">; Update: Partial<Save> };
    };
  };
};
