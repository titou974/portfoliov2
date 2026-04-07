import strings from "@/app/constants/strings.fr.json";

export function t(key: string): string {
  const parts = key.split(".");
  let value: unknown = strings;
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}
