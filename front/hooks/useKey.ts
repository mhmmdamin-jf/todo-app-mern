import { useEffect } from "react";

export function useKey({
  key,
  action,
  usingCtrl,
}: {
  key: string;
  action: Function;
  usingCtrl: boolean;
}) {
  const handleKey = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (usingCtrl) {
      if (e.key.toLowerCase() === key.toLowerCase() && e.ctrlKey) {
        action();
      }
    } else {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleKey(e);
    });
    return () => {
      document.removeEventListener("keyup", handleKey);
    };
  }, [action, key]);
}
