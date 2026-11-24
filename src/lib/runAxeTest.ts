import axe from 'axe-core';
import type { RunOptions } from 'axe-core';

export const axeModuleConfig: RunOptions = {
  runOnly: ['wcag2a', 'wcag2aa'],
  rules: {
    'color-contrast': { enabled: false },
  },
};

function printKeys(o: object, excludes: string[] = [], indentLevel = 0): string[] {
  let tabs = '';
  for (let i = 0; i < indentLevel; i++) {
    tabs += '  ';
  }
  return Object.keys(o)
    .map((k) => {
      if (!excludes.includes(k)) {
        return `${tabs}\x1b[1m\x1b[31m${k}: \x1b[0m\x1b[37m${(o as Record<string, unknown>)[k]}\n`;
      }
      return '';
    })
    .filter(Boolean);
}

// axe testing utility
// usage:
// it('has no axe errors', runAxeTest);
// it('has no axe errors', () => runAxeTest({ config: localConfigVar }));
class AxeError extends Error {
  name = 'AxeError';
}

export interface RunAxeTestOptions {
  /** element to test; defaults to the element with id "root" */
  rootNode?: axe.ElementContext;
  /** axe run options; defaults to `axeModuleConfig` */
  config?: RunOptions;
}

export async function runAxeTest(options: RunAxeTestOptions = {}): Promise<void> {
  const rootNode = document.getElementById('root') ?? document;
  return await axe
    .run(options.rootNode || rootNode, options.config || axeModuleConfig)
    .then(({ violations }) => {
      if (violations.length > 0) {
        const violationString = violations
          .map((v, i) => {
            const generalKeys = printKeys(v, ['nodes', 'id', 'impact', 'tags', 'help'], 1).join(
              '',
            );
            const detailKeys = printKeys(
              v.nodes[0],
              ['all', 'any', 'impact', 'none', 'failureSummary'],
              2,
            ).join('');
            const failureSummary = `\x1b[1m\x1b[31m    Failure Summary:
        \x1b[0m\x1b[37m${(v.nodes[0].failureSummary ?? '').replaceAll('\n', '\n      \x1b[97m-')}`;

            return `\x1b[1m Issue #${i + 1}: \x1b[3m\x1b[91m${v.id} -\x1b[0m\x1b[1m\x1b[31m ${v.help}
  ${generalKeys}
  \x1b[1m\x1b[31m  Sample issue (1 of ${v.nodes.length} detections)
  ${detailKeys}
  ${failureSummary}`;
          })
          .join('\n\n');
        throw new AxeError(`\x1b[1m \x1b[31mAxe violation(s): \n${violationString}\n`);
      }
    });
}
