import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontsDir = join(process.cwd(), "src/fonts");
const assetsDir = join(process.cwd(), "src/assets/og");

const fontFiles = [
  { file: "AtypKido-Medium.otf", weight: 500 },
  { file: "AtypKido-Bold.otf", weight: 700 },
] as const;

export const ogFonts = Promise.all(
  fontFiles.map(async ({ file, weight }) => ({
    name: "Kido",
    data: await readFile(join(fontsDir, file)),
    weight,
    style: "normal" as const,
  })),
);

export async function ogAsset(name: string) {
  const data = await readFile(join(assetsDir, name));
  return `data:image/${name.endsWith(".png") ? "png" : "jpeg"};base64,${data.toString("base64")}`;
}
