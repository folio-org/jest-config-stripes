import axe from 'axe-core';

export const axeModuleConfig = {
  runOnly: ['wcag2a', 'wcag2aa'],
  rules: {
    'color-contrast': { enabled: false },
  },
};

function printKeys(o, excludes = [], indentLevel = 0) {
  let tabs = '';
  for (let i = 0; i < indentLevel; i++) {
    tabs += '  ';
  }
  return Object.keys(o)
    .map((k) => {
      if (!excludes.includes(k)) {
        return `${tabs}\x1b[1m\x1b[31m${k}: \x1b[0m\x1b[37m${o[k]}\n`;
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

/**
 * isTruePositive
 * Identify false-positive results to prevent them from triggering errors.
 * Return false if this is a false-positive, true otherwise.
 *
 */
const isTruePositive = (i) => {
  // axe does not handle MCLs well. some aria-required-children gripes are legit,
  // but not those when both role=grid and aria-rowcount are present.
  // details at STCOM-1074 / https://github.com/folio-org/stripes-components/pull/1985
  if (i.id === 'aria-required-children') {
    if (i.nodes.every(node => node.html.match(/role="grid"/) && node.html.match(/aria-rowcount/))) {
      return false;
    }
  }

  return true;
};

export async function runAxeTest(options = {}) {
  const rootNode = document.getElementById('root');
  return await axe
    .run(options.rootNode || rootNode, options.config || axeModuleConfig)
    .then(({ violations }) => {
      const truePositiveViolations = violations.filter(isTruePositive);
      if (truePositiveViolations.length > 0) {
        const violationString = truePositiveViolations
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
        \x1b[0m\x1b[37m${v.nodes[0].failureSummary.replaceAll('\n', '\n      \x1b[97m-')}`;

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
