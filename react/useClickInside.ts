import React, { useEffect } from "react";

export const useClickInside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  onClickInside: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        onClickInside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickInside, ref]);
};
