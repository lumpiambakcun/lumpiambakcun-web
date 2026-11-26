import type { z } from "zod";

export const formToObject = (formData: FormData) =>
  Object.fromEntries([...formData].map(([key, value]) => [key, typeof value === "string" ? value.trim() : ""]));

export const pathErrors = (error: z.ZodError): Record<string, string> =>
  Object.fromEntries(error.issues.map((issue) => [issue.path.join("."), issue.message]).reverse());

export const fieldErrors = (error: z.ZodError): Record<string, string> =>
  Object.fromEntries(error.issues.map((issue) => [String(issue.path[0]), issue.message]).reverse());
