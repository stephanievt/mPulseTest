/**
 * Returns a date of birth string for the given age.
 * @param age - Age in years
 * @param format - Date format using tokens: `mm`, `dd`, `yyyy` (e.g. "mm/dd/yyyy", "mm-dd-yyyy")
 */
export function getDateOfBirth(age: number, format: string): string {
  const today = new Date();
  const birthDate = new Date(today.getFullYear() - age, today.getMonth(), today.getDate());

  const day = String(birthDate.getDate()).padStart(2, "0");
  const month = String(birthDate.getMonth() + 1).padStart(2, "0");
  const year = String(birthDate.getFullYear());

  return format.replace("mm", month).replace("dd", day).replace("yyyy", year);
}

/**
 * Returns the current date formatted as MMDDYYYY.
 */
export function getFormattedDate(): string {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear());
  return `${month}${day}${year}`;
}

/**
 * Returns the current time formatted as HHmmss (24-hour format).
 */
export function getFormattedTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}${minutes}${seconds}`;
}

/**
 * Selects a date from the date picker and verifies the field value.
 * @param page - Playwright Page instance
 * @param date - Date string in "MM/dd/yyyy" format
 * @param selector - CSS selector for the date input (defaults to "#effectiveDate")
 */
export async function selectDateFromPicker(
  page: import("@playwright/test").Page,
  date: string,
  selector = "#effectiveDate",
): Promise<void> {
  const { expect } = await import("@playwright/test");

  const [monthStr, dayStr, yearStr] = date.split("/");
  const month = parseInt(monthStr, 10) - 1; // month index (0-based for <select>)
  const day = dayStr.replace(/^0/, ""); // remove leading zero for day text matching
  const year = yearStr;

  const calendar = page.locator(selector);
  await calendar.click();

  const monthDropdown = page.locator("select.monthselect:visible");
  await monthDropdown.selectOption(String(month));

  const yearDropdown = page.locator("select.yearselect:visible");
  await yearDropdown.selectOption(year);

  const dayCell = page
    .locator('td[class="available"]:visible, td[class="weekend available"]:visible')
    .filter({ hasText: new RegExp(`^${day}$`) });
  await dayCell.click();

  await expect(calendar).toHaveValue(date);
}
