// utils/urlManager.ts
import { ENV, CLIENT } from "./env";

const modulePaths = {
  testingHub: "/ehp/eapp/content/demo_hub",
  storefront: "/ehp/eapp/ebuyer?execution=e1s1",
  portal: "/ehpportal/eapp/login",
  commissions: "/commissions/eapp/login",
} as const;

// ===============================
// PROD DOMAINS
// ===============================

const PROD_DOMAINS: Record<typeof CLIENT, string> = {
  UUHP: "https://enroll.uhealthplan.utah.edu",
  EMI: "https://oi.emihealth.com",
  THI: "https://enroll.mending.com",
  IHG: "https://enroll.ihg.onlineinsight.com",
  PHP: "https://enroll.uofmhealthplan.org",
  IEHP: "https://covered.iehp.org",
  FHCP: "https://enroll.fhcp.com",
  DEMO: "https://enroll.mpulseportals.com",
  CHOICE: "https://enroll.mpulseportals.com",
};

type Module = keyof typeof modulePaths;

// Build base URL dynamically using ENV and CLIENT from env.ts
function getBaseUrl(): string {
  const clientLower = CLIENT.toLowerCase();
  if (ENV === "prod") {
    return PROD_DOMAINS[CLIENT];
  }
  return `https://${ENV}${clientLower}.onlineinsight.com`;
}

// Build full URL for a module
function buildModuleUrl(module: Module) {
  return `${getBaseUrl()}${modulePaths[module]}`;
}

// Export getUrl object for easy use in tests
export const getUrl = {
  testingHub: () => buildModuleUrl("testingHub"),
  storefront: () => buildModuleUrl("storefront"),
  portal: () => buildModuleUrl("portal"),
  commissions: () => buildModuleUrl("commissions"),
};
