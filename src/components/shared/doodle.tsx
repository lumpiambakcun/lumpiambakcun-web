import Image from "next/image";
import { cn } from "@/lib/utils";

type Point = readonly [x: number, y: number];

export type DoodleSpec = {
  name: string;
  width: number;
  height: number;
  rotate?: number;
  opacity?: number;
  position: { base?: Point; md?: Point; lg?: Point };
};

const FRAME_WIDTH = { base: 390, md: 768, lg: 1440 } as const;
type Breakpoint = keyof typeof FRAME_WIDTH;

function anchor(point: Point, width: number, frame: number) {
  const [x, y] = point;
  const fromRight = x + width / 2 > frame / 2;
  return { left: fromRight ? "auto" : `${x}px`, right: fromRight ? `${frame - x - width}px` : "auto", top: `${y}px` };
}

export function Doodle({ name, width, height, rotate = 0, opacity = 0.1, position }: DoodleSpec) {
  const resolved: Partial<Record<Breakpoint, Point>> = {};
  let last: Point | undefined;
  for (const bp of ["base", "md", "lg"] as const) {
    last = position[bp] ?? last;
    if (last) resolved[bp] = last;
  }
  const style: Record<string, string | number> = { rotate: `${-rotate}deg`, transformOrigin: "top left", width, height, opacity };
  for (const bp of ["base", "md", "lg"] as const) {
    const point = resolved[bp] ?? resolved.base ?? resolved.md ?? resolved.lg!;
    const { left, right, top } = anchor(point, width, FRAME_WIDTH[bp]);
    const suffix = bp === "base" ? "" : `-${bp}`;
    style[`--l${suffix}`] = left;
    style[`--r${suffix}`] = right;
    style[`--t${suffix}`] = top;
  }

  return (
    <Image
      src={`/images/doodles/${name}.webp`}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      sizes={`${width}px`}
      style={style}
      className={cn(
        "pointer-events-none absolute z-0 max-w-none object-contain select-none",
        "top-(--t) left-(--l) right-(--r) md:top-(--t-md) md:left-(--l-md) md:right-(--r-md) lg:top-(--t-lg) lg:left-(--l-lg) lg:right-(--r-lg)",
        !position.base && !position.md && "hidden lg:block",
        !position.base && position.md && "hidden md:block",
      )}
    />
  );
}
