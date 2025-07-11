// Type definitions for DESTIN Agent and Score Update Engine

export interface ARFTrait {
  accuracy?: number;
  helpfulness?: number;
  integrity?: number;
  civility?: number;
  responsiveness?: number;
  self_awareness?: number;
  consistency?: number;
  transparency?: number;
  cooperativeness?: number;
  humility?: number;
  efficiency?: number;
  neutrality?: number;
  intent_alignment?: number;
  graceful_degradation?: number;
  adaptivity?: number;
  explainability?: number;
  trust_calibration?: number;
}

export interface Reputation {
  [domain: string]: ARFTrait;
}

export interface AgentMetadata {
  agent_type?: 'domain-specialist' | 'multi-purpose' | 'general-purpose' | 'task-specific';
  domain_tags?: string[];
  created_at?: string;
  version?: string;
}

export interface Agent {
  agent_id: string;
  public_key: string;
  display_name?: string;
  namespace_aliases?: { [key: string]: string };
  metadata?: AgentMetadata;
  reputation?: Reputation;
}

export interface ScoreUpdate {
  domain: string;
  trait: keyof ARFTrait;
  delta: number;
  timestamp: string; // ISO 8601
  decay_lambda?: number; // Optional decay rate
} 