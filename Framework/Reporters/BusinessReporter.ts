import fs from 'fs';
import path from 'path';
import type { FullResult, Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import { FEATURE_METADATA_DIR, GHERKIN_STEP_PATTERN, NARRATIVE_ATTACHMENT, SCREENSHOT_ATTACHMENT } from '../Gherkin';
import type { FeatureRecord, StepRecord } from './ReportModel';
import type { FeatureReportWriter } from './FeatureReportWriter';
import { HtmlFeatureReportWriter } from './HtmlFeatureReportWriter';

/** Name of the testInfo.attach() call used to supply a Scenario's plain-English description. */
const SCENARIO_DESCRIPTION_ATTACHMENT = 'Test description';

interface BusinessReporterOptions {
  outputFolder?: string;
  /** Strategy used to render each collected FeatureRecord; defaults to HTML. */
  writer?: FeatureReportWriter;
}

/** Collects plain-English Feature/Scenario/Step results and hands them to an injected writer. */
class BusinessReporter implements Reporter {
  private readonly outputFolder: string;
  private readonly writer: FeatureReportWriter;
  private readonly features = new Map<string, FeatureRecord>();

  constructor(options: BusinessReporterOptions = {}) {
    this.outputFolder = options.outputFolder ?? 'business-report';
    this.writer = options.writer ?? new HtmlFeatureReportWriter();
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const file = test.location.file;
    let feature = this.features.get(file);
    if (!feature) {
      feature = { ...readFeatureMetadata(file), scenarios: [] };
      this.features.set(file, feature);
    }

    const attachment = result.attachments.find((a) => a.name === SCENARIO_DESCRIPTION_ATTACHMENT);
    feature.scenarios.push({
      name: test.title,
      description: attachment?.body ? attachment.body.toString('utf-8') : '',
      status: result.status,
      steps: collectGherkinSteps(result.steps),
    });
  }

  onEnd(_result: FullResult): void {
    fs.mkdirSync(this.outputFolder, { recursive: true });

    for (const feature of this.features.values()) {
      const content = this.writer.render(feature);
      const outFile = path.join(this.outputFolder, `${path.parse(feature.file).name}.${this.writer.fileExtension}`);
      fs.writeFileSync(outFile, content, 'utf-8');
    }
  }
}

function featureNameFromFile(file: string): string {
  return path.parse(file).name.replace(/\.spec$/, '');
}

/** Recursively finds Given/When/Then/And/But steps anywhere in the step tree, in execution order. */
function collectGherkinSteps(steps: TestStep[]): StepRecord[] {
  const found: StepRecord[] = [];

  for (const step of steps) {
    const match = GHERKIN_STEP_PATTERN.exec(step.title);
    if (match) {
      found.push({
        keyword: match[1],
        description: match[2],
        narrative: findNarrative(step),
        screenshots: findScreenshots(step),
        passed: !step.error,
      });
    }
    found.push(...collectGherkinSteps(step.steps));
  }

  return found;
}

/** narrate() attaches to a nested "Attach ..." child step, not the Gherkin step itself, so search its subtree. */
function findNarrative(step: TestStep): string {
  const attachment = step.attachments.find((a) => a.name === NARRATIVE_ATTACHMENT);
  if (attachment?.body) return attachment.body.toString('utf-8');

  for (const child of step.steps) {
    const narrative = findNarrative(child);
    if (narrative) return narrative;
  }

  return '';
}

/** attachScreenshot() attaches to a nested child step, so search the whole subtree and collect every screenshot found. */
function findScreenshots(step: TestStep): string[] {
  const found: string[] = [];

  for (const attachment of step.attachments) {
    if (attachment.name === SCREENSHOT_ATTACHMENT && attachment.body) {
      found.push(`data:${attachment.contentType};base64,${attachment.body.toString('base64')}`);
    }
  }

  for (const child of step.steps) {
    found.push(...findScreenshots(child));
  }

  return found;
}

/** Reads Feature metadata written independently by Gherkin.ts's Feature() at spec-file load time. */
function readFeatureMetadata(file: string): Omit<FeatureRecord, 'scenarios'> {
  const key = featureNameFromFile(file);
  const metaFile = path.join(FEATURE_METADATA_DIR, `${key}.json`);

  if (!fs.existsSync(metaFile)) {
    return { file, name: key, description: '' };
  }

  const parsed = JSON.parse(fs.readFileSync(metaFile, 'utf-8'));
  return { file, name: parsed.name ?? key, description: parsed.description ?? '' };
}

export default BusinessReporter;
