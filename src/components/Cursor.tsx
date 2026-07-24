import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isCoarsePointer || prefersReducedMotion) return;

    let hover = false;
    let animationFrameId = 0;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const onMouseOver = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      if (!element) return;

      if (element.dataset.cursor === "icons") {
        const rect = element.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
        hover = true;
      }

      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = (event: MouseEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      const nextElement = (event.relatedTarget as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      );

      if (!element || element === nextElement) return;
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    const loop = () => {
      if (!hover) {
        cursorPos.x += (mousePos.x - cursorPos.x) * 0.16;
        cursorPos.y += (mousePos.y - cursorPos.y) * 0.16;
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
