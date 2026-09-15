import type { FeatureRecord } from './ReportModel';

/** Injectable strategy for turning a collected FeatureRecord into report content. */
export interface FeatureReportWriter {
  /** File extension (no dot) this writer produces, e.g. 'html' or 'md'. */
  readonly fileExtension: string;

  /** Renders a single feature's report content. */
  render(feature: FeatureRecord): string;
}
