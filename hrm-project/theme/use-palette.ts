import * as React from "react";
import { applyCssVar, removeCssVar } from "@/lib/color-utils";

const STORAGE_KEY = "ui-palette-overrides";

export type PaletteOverrides = Record<string, string>;

function loadFromStorage(): PaletteOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PaletteOverrides) : {};
  } catch {
    return {};
  }
}

function saveToStorage(overrides: PaletteOverrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {}
}

function applyOverrides(overrides: PaletteOverrides) {
  for (const [name, value] of Object.entries(overrides)) {
    applyCssVar(name, value);
  }
}

export function usePalette() {
  const [overrides, setOverrides] = React.useState<PaletteOverrides>(
    loadFromStorage,
  );

  React.useEffect(() => {
    applyOverrides(overrides);
  }, [overrides]);

  const setVar = React.useCallback((name: string, value: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [name]: value };
      saveToStorage(next);
      applyCssVar(name, value);
      return next;
    });
  }, []);

  const resetAll = React.useCallback(() => {
    setOverrides((prev) => {
      for (const name of Object.keys(prev)) {
        removeCssVar(name);
      }
      saveToStorage({});
      return {};
    });
  }, []);

  const hasOverrides = Object.keys(overrides).length > 0;

  return { overrides, setVar, resetAll, hasOverrides };
}
