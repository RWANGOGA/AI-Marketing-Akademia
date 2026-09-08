export interface Product {
  id: string;
  name: string;
  slug: string;
  published: boolean;
  problem: string;
  target: string;
  description: string;
  features: string[];
  benefits: string[];
  capabilities: Array<{
    icon: string;
    title: string;
    body: string;
  }>;
}

export type LeadStatus =
  | "new" | "contacted" | "responded" | "needs-followup"
  | "meeting" | "customer" | "lost";

export interface Lead {
  id: string;
  company: string;
  website: string;
  industry: string;
  location: string;
  contact: string;
  email: string;
  product_id: string;
  status: LeadStatus;
  problem: string;
  reasoning: string;
  last_contact: string;
}

export type CampaignStatus = "running" | "paused" | "completed";

export interface Campaign {
  id: string;
  name: string;
  product_id: string;
  target: string;
  status: CampaignStatus;
  found: number;
  contacted: number;
  responded: number;
  interested: number;
  meetings: number;
  customers: number;
}

export interface Email {
  id: string;
  lead_name: string;
  product_name: string;
  status: string;
  subject: string;
  body: string;
}
