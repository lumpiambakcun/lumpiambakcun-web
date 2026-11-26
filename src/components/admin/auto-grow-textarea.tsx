"use client";

import { useLayoutEffect, useRef } from "react";
import { fieldTextareaClass } from "@/components/shared/form-field";
import { cn } from "@/lib/utils";

type AutoGrowTextareaProps = Omit<React.ComponentProps<"textarea">, "value"> & { value: string };

export function AutoGrowTextarea({ value, className, rows = 2, ...props }: AutoGrowTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const fit = () => {
      if (element.offsetParent === null) return;
      element.style.height = "auto";
      // scrollHeight tidak menghitung border; tanpa ini baris terakhir terpotong.
      element.style.height = `${element.scrollHeight + element.offsetHeight - element.clientHeight}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <textarea ref={ref} value={value} rows={rows} className={cn(fieldTextareaClass, "resize-none overflow-hidden", className)} {...props} />;
}
