export const i18n = {
  defaultLocale: "pl",
  locales: ["en", "pl"],
} as const;
export type Locale = (typeof i18n)["locales"][number];

export function hasLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale);
}
