#!/usr/bin/env ts-node
/**
 * DESTIN Protocol CLI
 *
 * Usage:
 *   npx ts-node src/cli/destin-cli.ts apply-score-update \
 *     --agent protocol-data/samples/agent-definition.sample.json \
 *     --update '{"domain":"law","trait":"integrity","delta":0.05,"timestamp":"2025-06-01T12:00:00Z","decay_lambda":0.0001}' \
 *     --now "2025-06-01T13:00:00Z"
 *
 * Options:
 *   --agent   Path to agent JSON file
 *   --update  Score update as JSON string or path to JSON file
 *   --now     Current time (ISO 8601 string)
 */
import * as fs from 'fs';
import * as path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { applyScoreUpdate } from '../engine/applyScoreUpdate';
import { Agent, ScoreUpdate } from '../engine/types';

const argv = yargs(hideBin(process.argv))
  .command('apply-score-update', 'Apply a score update to an agent', {
    agent: {
      type: 'string',
      demandOption: true,
      describe: 'Path to agent JSON file',
    },
    update: {
      type: 'string',
      demandOption: true,
      describe: 'Score update as JSON string or path to JSON file',
    },
    now: {
      type: 'string',
      demandOption: true,
      describe: 'Current time (ISO 8601 string)',
    },
  })
  .help()
  .argv as any;

async function main() {
  if (argv._[0] === 'apply-score-update') {
    // Load agent
    const agentPath = path.resolve(argv.agent);
    const agent: Agent = JSON.parse(fs.readFileSync(agentPath, 'utf8'));

    // Load update (from string or file)
    let update: ScoreUpdate;
    try {
      if (fs.existsSync(argv.update)) {
        update = JSON.parse(fs.readFileSync(argv.update, 'utf8'));
      } else {
        update = JSON.parse(argv.update);
      }
    } catch (e) {
      console.error('Failed to parse update JSON:', e);
      process.exit(1);
    }

    // Apply update
    const updatedAgent = applyScoreUpdate(agent, update, argv.now);
    console.log(JSON.stringify(updatedAgent, null, 2));
  } else {
    yargs.showHelp();
  }
}

main(); 