import * as React from "react";
import { Paintbrush, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePalette } from "@/hooks/use-palette";
import {
  hslStringToHex,
  hexToHslString,
  readCssVar,
} from "@/lib/color-utils";
import { cn } from "@/lib/utils";

/* ── Color groups ─────────────────────────────────────────────────────────── */

type ColorGroup = { label: string; vars: { name: string; label: string }[] };

const COLOR_GROUPS: ColorGroup[] = [
  {
    label: "Surfaces",
    vars: [
      { name: "--background", label: "Background" },
      { name: "--card", label: "Card" },
      { name: "--popover", label: "Popover" },
    ],
  },
  {
    label: "Text",
    vars: [
      { name: "--foreground", label: "Foreground" },
      { name: "--muted-foreground", label: "Muted text" },
    ],
  },
  {
    label: "Primary",
    vars: [
      { name: "--primary", label: "Primary" },
      { name: "--primary-foreground", label: "Primary text" },
      { name: "--primary-border", label: "Primary border" },
    ],
  },
  {
    label: "Secondary",
    vars: [
      { name: "--secondary", label: "Secondary" },
      { name: "--secondary-foreground", label: "Secondary text" },
      { name: "--secondary-border", label: "Secondary border" },
    ],
  },
  {
    label: "Accent",
    vars: [
      { name: "--accent", label: "Accent" },
      { name: "--accent-foreground", label: "Accent text" },
    ],
  },
  {
    label: "Destructive",
    vars: [
      { name: "--destructive", label: "Destructive" },
      { name: "--destructive-foreground", label: "Destructive text" },
      { name: "--destructive-border", label: "Destructive border" },
    ],
  },
  {
    label: "UI Chrome",
    vars: [
      { name: "--border", label: "Border" },
      { name: "--input", label: "Input" },
      { name: "--ring", label: "Ring" },
      { name: "--muted", label: "Muted" },
    ],
  },
  {
    label: "Sidebar",
    vars: [
      { name: "--sidebar", label: "Sidebar bg" },
      { name: "--sidebar-foreground", label: "Sidebar text" },
      { name: "--sidebar-primary", label: "Sidebar primary" },
      { name: "--sidebar-border", label: "Sidebar border" },
    ],
  },
];

/* ── Font options (all preloaded in index.html) ───────────────────────────── */

type FontOption = { label: string; value: string };

const SANS_FONTS: FontOption[] = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Geist", value: "'Geist', sans-serif" },
  { label: "DM Sans", value: "'DM Sans', sans-serif" },
  { label: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Open Sans", value: "'Open Sans', sans-serif" },
  { label: "Outfit", value: "'Outfit', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Oxanium", value: "'Oxanium', sans-serif" },
];

const SERIF_FONTS: FontOption[] = [
  { label: "Georgia (default)", value: "Georgia, serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "Lora", value: "'Lora', serif" },
  { label: "Merriweather", value: "'Merriweather', serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Source Serif 4", value: "'Source Serif 4', serif" },
];

const MONO_FONTS: FontOption[] = [
  { label: "Menlo (default)", value: "Menlo, monospace" },
  { label: "Fira Code", value: "'Fira Code', monospace" },
  { label: "Geist Mono", value: "'Geist Mono', monospace" },
  { label: "IBM Plex Mono", value: "'IBM Plex Mono', monospace" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { label: "Roboto Mono", value: "'Roboto Mono', monospace" },
  { label: "Source Code Pro", value: "'Source Code Pro', monospace" },
  { label: "Space Mono", value: "'Space Mono', monospace" },
];

/* ── Color row ────────────────────────────────────────────────────────────── */

function ColorRow({
  name,
  label,
  overrides,
  onSet,
}: {
  name: string;
  label: string;
  overrides: Record<string, string>;
  onSet: (name: string, value: string) => void;
}) {
  const currentHsl = overrides[name] ?? readCssVar(name);
  const hex = hslStringToHex(currentHsl);
  const isOverridden = name in overrides;

  return (
    <div className="flex items-center gap-2 py-1">
      <label
        className="relative flex-shrink-0 w-7 h-7 rounded-md border border-border cursor-pointer overflow-hidden"
        style={{ backgroundColor: hex }}
        title={`${name}: ${currentHsl}`}
      >
        <input
          type="color"
          value={hex}
          onChange={(e) => onSet(name, hexToHslString(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
      <span
        className={cn(
          "flex-1 text-sm truncate",
          isOverridden ? "text-foreground font-medium" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      {isOverridden && (
        <span className="text-xs text-primary/60 flex-shrink-0">●</span>
      )}
    </div>
  );
}

/* ── Font row ─────────────────────────────────────────────────────────────── */

function FontRow({
  varName,
  label,
  options,
  overrides,
  onSet,
}: {
  varName: string;
  label: string;
  options: FontOption[];
  overrides: Record<string, string>;
  onSet: (name: string, value: string) => void;
}) {
  const current = overrides[varName] ?? "";
  const isOverridden = varName in overrides;

  const activeOption = options.find((o) => o.value === current);
  const displayName = activeOption?.label ?? options[0]?.label ?? label;
  const previewFont = activeOption?.value ?? options[0]?.value ?? "sans-serif";

  return (
    <div className="flex items-center gap-2 py-1.5">
      <div
        className="flex-shrink-0 w-7 h-7 rounded-md border border-border bg-muted flex items-center justify-center text-[11px] font-bold text-muted-foreground select-none"
        style={{ fontFamily: previewFont }}
        title={previewFont}
      >
        Aa
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm truncate leading-tight",
            isOverridden ? "text-foreground font-medium" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground truncate">{displayName}</p>
      </div>
      <select
        value={current || options[0]?.value}
        onChange={(e) => onSet(varName, e.target.value)}
        className="flex-shrink-0 text-xs border border-border rounded bg-background text-foreground px-1.5 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring max-w-[90px]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {isOverridden && (
        <span className="text-xs text-primary/60 flex-shrink-0">●</span>
      )}
    </div>
  );
}

/* ── Radius slider ────────────────────────────────────────────────────────── */

const RADIUS_STEPS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0, 1.25, 1.5];
const RADIUS_LABELS: Record<number, string> = {
  0: "None",
  0.125: "XS",
  0.25: "SM",
  0.375: "MD-",
  0.5: "MD",
  0.625: "MD+",
  0.75: "LG",
  0.875: "XL-",
  1.0: "XL",
  1.25: "2XL",
  1.5: "Full",
};

function RadiusRow({
  overrides,
  onSet,
}: {
  overrides: Record<string, string>;
  onSet: (name: string, value: string) => void;
}) {
  const stored = overrides["--radius"];
  const currentRem = stored ? parseFloat(stored) : 0.5;
  const clampedIndex = RADIUS_STEPS.reduce((best, step, i) =>
    Math.abs(step - currentRem) < Math.abs(RADIUS_STEPS[best] - currentRem) ? i : best, 0);
  const currentStep = RADIUS_STEPS[clampedIndex] ?? 0.5;
  const isOverridden = "--radius" in overrides;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    const val = RADIUS_STEPS[idx] ?? 0.5;
    onSet("--radius", `${val}rem`);
  };

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-sm", isOverridden ? "text-foreground font-medium" : "text-muted-foreground")}>
          Border Radius
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground tabular-nums">{currentStep}rem</span>
          <span className="text-xs font-medium text-foreground bg-muted px-1.5 py-0.5 rounded">
            {RADIUS_LABELS[currentStep] ?? ""}
          </span>
          {isOverridden && <span className="text-xs text-primary/60">●</span>}
        </div>
      </div>

      {/* Live preview */}
      <div className="flex gap-1.5 mb-2">
        {[20, 32, 44].map((size) => (
          <div
            key={size}
            className="border border-border bg-primary/10 flex-shrink-0"
            style={{ width: size, height: size, borderRadius: `${currentStep}rem` }}
          />
        ))}
        <div
          className="border border-border bg-primary/10 flex-1 h-5"
          style={{ borderRadius: `${currentStep}rem` }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={RADIUS_STEPS.length - 1}
        step={1}
        value={clampedIndex}
        onChange={handleChange}
        className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer accent-primary"
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-muted-foreground">Sharp</span>
        <span className="text-[10px] text-muted-foreground">Rounded</span>
      </div>
    </div>
  );
}

/* ── Main editor panel ────────────────────────────────────────────────────── */

export function PaletteEditor() {
  const [open, setOpen] = React.useState(false);
  const { overrides, setVar, resetAll, hasOverrides } = usePalette();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Open style editor"
        onClick={() => setOpen(true)}
        className={cn(hasOverrides && "border-primary/40")}
      >
        <Paintbrush className="h-4 w-4" />
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-card border-l border-border shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-sm text-foreground">
                  Style Editor
                </span>
                {hasOverrides && (
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                    custom
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {hasOverrides && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetAll}
                    title="Reset all to defaults"
                    className="h-7 w-7"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-7 w-7"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {/* Typography section */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Typography
                </p>
                <FontRow
                  varName="--font-sans"
                  label="Sans-serif"
                  options={SANS_FONTS}
                  overrides={overrides}
                  onSet={setVar}
                />
                <FontRow
                  varName="--font-serif"
                  label="Serif"
                  options={SERIF_FONTS}
                  overrides={overrides}
                  onSet={setVar}
                />
                <FontRow
                  varName="--font-mono"
                  label="Monospace"
                  options={MONO_FONTS}
                  overrides={overrides}
                  onSet={setVar}
                />
              </div>

              <div className="border-t border-border mb-4" />

              {/* Shape section */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Shape
                </p>
                <RadiusRow overrides={overrides} onSet={setVar} />
              </div>

              <div className="border-t border-border mb-4" />

              {/* Color sections */}
              {COLOR_GROUPS.map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {group.label}
                  </p>
                  {group.vars.map((v) => (
                    <ColorRow
                      key={v.name}
                      name={v.name}
                      label={v.label}
                      overrides={overrides}
                      onSet={setVar}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border flex-shrink-0">
              <p className="text-xs text-muted-foreground">
                Changes apply live and persist across reloads.
                {hasOverrides && (
                  <button
                    className="ml-1 underline text-foreground"
                    onClick={resetAll}
                  >
                    Reset to defaults
                  </button>
                )}
              </p>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
