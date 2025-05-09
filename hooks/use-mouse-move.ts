import { useEffect } from "react";

export function useMouseMove(callback: (e: MouseEvent) => void) {
  useEffect(() => {
    window.addEventListener("mousemove", callback);

    return () => {
      window.removeEventListener("mousemove", callback);
    };
  }, [callback]);
}
