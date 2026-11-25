export const hiddenPages = ["/menu", "/cara-pesan", "/lokasi", "/checkout"] as const;

export function isHiddenPath(path: string) {
  return hiddenPages.some((page) => path === page || path.startsWith(`${page}/`));
}
