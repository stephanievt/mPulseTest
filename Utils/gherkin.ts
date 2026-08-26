import { test } from '@playwright/test';

export const Given = (description: string, fn: () => Promise<void>) =>
  test.step(`Given ${description}`, fn);

export const When = (description: string, fn: () => Promise<void>) =>
  test.step(`When ${description}`, fn);

export const Then = (description: string, fn: () => Promise<void>) =>
  test.step(`Then ${description}`, fn);

export const And = (description: string, fn: () => Promise<void>) =>
  test.step(`And ${description}`, fn);
