export type AccessCode = string & { __brand: "AccessCode" };

export const asAccessCode = (v: string) => v as AccessCode;

export function generateAccessCode(prefix = "XMAS"): AccessCode {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const rand2 = Math.random().toString(36).slice(2, 6).toUpperCase();
  return asAccessCode(`${prefix}-${rand}-${rand2}`);
}
