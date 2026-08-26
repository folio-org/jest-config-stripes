#!/usr/bin/env node

/**
 * run jest
 * this is a simple pass-through script, allowing dependencies to be consolidated
 * in this repository.
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const jestPackage = fileURLToPath(import.meta.resolve('jest/package.json'));
const jest = join(dirname(jestPackage), 'bin', 'jest.js');
const result = spawnSync(jest, process.argv.slice(2), { stdio: 'inherit' });

if (result.error) {
  throw result.error;
}

process.exitCode = result.status ?? 1;
