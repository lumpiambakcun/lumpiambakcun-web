import { type RefObject, useEffect } from "react";

export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      el.style.setProperty("--fade-l", el.scrollLeft > 2 ? "40px" : "0px");
      el.style.setProperty("--fade-r", el.scrollLeft < max - 2 ? "40px" : "0px");
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);

    let startX = 0;
    let startScroll = 0;
    let dragged = false;
    const onMove = (event: PointerEvent) => {
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 5) dragged = true;
      if (dragged) el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.style.scrollSnapType = "";
      el.style.cursor = "";
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0 || el.scrollWidth <= el.clientWidth) return;
      startX = event.clientX;
      startScroll = el.scrollLeft;
      dragged = false;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };
    const onClick = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("click", onClick, true);
      onUp();
      observer.disconnect();
    };
  }, [ref]);
}
