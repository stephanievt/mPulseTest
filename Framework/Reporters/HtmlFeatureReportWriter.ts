import type { FeatureRecord, ScenarioRecord, StepRecord } from './ReportModel';
import type { FeatureReportWriter } from './FeatureReportWriter';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderStepHtml(step: StepRecord): string {
  return `    <article class="step">
      <h3>${escapeHtml(step.keyword)} ${escapeHtml(step.description)} <span class="badge ${step.passed ? 'passed' : 'failed'}">${step.passed ? 'passed' : 'failed'}</span></h3>
      <p class="narrative">${escapeHtml(step.narrative)}</p>
${step.screenshots.map((src) => `      <img class="screenshot" src="${src}" alt="Screenshot for ${escapeHtml(step.description)}" />\n`).join('')}
    </article>
`;
}

function renderScenarioHtml(scenario: ScenarioRecord): string {
  return `  <section class="scenario">
    <h2>${escapeHtml(scenario.name)} <span class="badge ${scenario.status}">${escapeHtml(scenario.status)}</span></h2>
    <p class="scenario-description">${escapeHtml(scenario.description)}</p>
${scenario.steps.map(renderStepHtml).join('')}
  </section>
`;
}

/** Renders a Feature as a self-contained, plain-English HTML page. */
export class HtmlFeatureReportWriter implements FeatureReportWriter {
  readonly fileExtension = 'html';

  render(feature: FeatureRecord): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Feature: ${escapeHtml(feature.name)}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 900px; margin: 2rem auto; color: #1a1a1a; }
  h1 { border-bottom: 2px solid #ddd; padding-bottom: 0.5rem; }
  h2 { font-size: 1.15rem; }
  .feature-description { font-size: 1.05rem; color: #444; }
  .scenario { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee; }
  .scenario-description { color: #444; }
  .step { margin: 0.75rem 0 0.75rem 1rem; }
  h3 { font-size: 1rem; margin-bottom: 0.25rem; }
  .narrative { color: #444; margin: 0.25rem 0 0 0; }
  .screenshot { max-width: 100%; margin-top: 0.5rem; border: 1px solid #ddd; border-radius: 0.25rem; }
  .badge { font-size: 0.7rem; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 0.75rem; }
  .badge.passed { background: #e3f7e8; color: #1a7f37; }
  .badge.failed { background: #fde8e8; color: #b91c1c; }
  .badge.skipped, .badge.timedOut, .badge.interrupted { background: #f1f1f1; color: #555; }
</style>
</head>
<body>
  <h1>Feature: ${escapeHtml(feature.name)}</h1>
  <p class="feature-description">${escapeHtml(feature.description)}</p>
${feature.scenarios.map(renderScenarioHtml).join('')}
</body>
</html>
`;
  }
}
