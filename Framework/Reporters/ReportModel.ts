import type { TestResult } from '@playwright/test/reporter';

export interface StepRecord {
  keyword: string;
  description: string;
  narrative: string;
  screenshots: string[];
  passed: boolean;
}

export interface ScenarioRecord {
  name: string;
  description: string;
  status: TestResult['status'];
  steps: StepRecord[];
}

export interface FeatureRecord {
  file: string;
  name: string;
  description: string;
  scenarios: ScenarioRecord[];
}
