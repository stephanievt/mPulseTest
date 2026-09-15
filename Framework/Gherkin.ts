import fs from 'fs';
import path from 'path';
import {
  test,
  type Locator,
  type Page,
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  type PlaywrightWorkerArgs,
  type PlaywrightWorkerOptions,
  type TestInfo,
} from '@playwright/test';

export type GherkinKeyword = 'Given' | 'When' | 'Then' | 'And' | 'But';

/** Matches a step title produced by this module, so reporters can recover the keyword. */
export const GHERKIN_STEP_PATTERN = /^(Given|When|Then|And|But) (.*)$/;

// `box: true` reports failures at the caller's line instead of inside this helper.
const gherkinStep =
  (keyword: GherkinKeyword) =>
  <T>(description: string, body: () => T | Promise<T>): Promise<T> =>
    test.step(`${keyword} ${description}`, body, { box: true });

export const Given = gherkinStep('Given');
export const When = gherkinStep('When');
export const Then = gherkinStep('Then');
export const And = gherkinStep('And');
export const But = gherkinStep('But');

/** Name of the testInfo.attach() call used by narrate() to carry a step's plain-English outcome. */
export const NARRATIVE_ATTACHMENT = 'Narrative';

/** Lets the author describe, in plain English, what happened in the current Given/When/Then step. */
export const narrate = (text: string): Promise<void> =>
  test.info().attach(NARRATIVE_ATTACHMENT, { body: text, contentType: 'text/markdown' });

/** Name of the testInfo.attach() call used by attachScreenshot() to carry a step's screenshot. */
export const SCREENSHOT_ATTACHMENT = 'Screenshot';


/** Directory where Feature metadata is written, read independently by reporters (not via testInfo). */
export const FEATURE_METADATA_DIR = path.resolve(__dirname, '..', '.feature-meta');

/** Declares a Feature (one per spec file) and records its description outside the Playwright reporter pipeline. */
export const Feature = (name: string, description: string, file: string, body: () => void): void => {
  writeFeatureMetadata(file, name, description);
  test.describe(`Feature: ${name}`, body);
};

function writeFeatureMetadata(file: string, name: string, description: string): void {
  fs.mkdirSync(FEATURE_METADATA_DIR, { recursive: true });
  const key = path.parse(file).name.replace(/\.spec$/, '');
  const metaFile = path.join(FEATURE_METADATA_DIR, `${key}.json`);
  fs.writeFileSync(metaFile, JSON.stringify({ file, name, description }, null, 2), 'utf-8');
}

type ScenarioBody = (
  fixtures: PlaywrightTestArgs & PlaywrightTestOptions & PlaywrightWorkerArgs & PlaywrightWorkerOptions,
  testInfo: TestInfo,
) => void | Promise<void>;

export const Scenario = (name: string, body: ScenarioBody): void =>
  test(`Scenario: ${name}`, body);

