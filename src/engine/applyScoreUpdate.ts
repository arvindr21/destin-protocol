import { Agent, ScoreUpdate } from './types';

/**
 * Applies a score update to an agent's ARF vector, supporting decay and domain scoping.
 *
 * @param agent - The agent object to update
 * @param update - The score update (domain, trait, delta, timestamp, decay_lambda)
 * @param now - The current time (ISO 8601 string)
 * @returns Updated agent object
 */
export function applyScoreUpdate(agent: Agent, update: ScoreUpdate, now: string): Agent {
  // Clone agent to avoid mutation
  const updatedAgent: Agent = JSON.parse(JSON.stringify(agent));
  if (!updatedAgent.reputation) updatedAgent.reputation = {};
  if (!updatedAgent.reputation[update.domain]) updatedAgent.reputation[update.domain] = {};

  const trait = update.trait;
  const prevScore = updatedAgent.reputation[update.domain][trait] ?? 0;

  // Calculate decay if applicable
  let effectiveDelta = update.delta;
  if (update.decay_lambda && update.timestamp) {
    const t0 = new Date(update.timestamp).getTime();
    const t1 = new Date(now).getTime();
    const dt = Math.max(0, (t1 - t0) / 1000); // seconds
    effectiveDelta = update.delta * Math.exp(-update.decay_lambda * dt);
  }

  // Clamp new score between 0 and 1
  let newScore = prevScore + effectiveDelta;
  newScore = Math.max(0, Math.min(1, newScore));

  updatedAgent.reputation[update.domain][trait] = newScore;
  return updatedAgent;
} 