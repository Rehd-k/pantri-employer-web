"use client";

import Image from "next/image";
import { useThemeOptional } from "./ThemeProvider";

export type BrandLogoVariant = "mark" | "lockup" | "wordmark";
export type BrandLogoTone = "auto" | "color" | "white" | "black";

const ASSETS = {
  mark: {
    color: "/colored_logo.png",
    white: "/white_logo.png",
    black: "/logo_black.png",
  },
  lockup: {
    color: "/colored_logo_and_name.png",
    white: "/white_logo_and_name.png",
    black: "/black_logo_and_name.png",
  },
  wordmark: {
    color: "/colored_name.png",
    white: "/white_name.png",
    black: "/black_name.png",
  },
} as const;

const ASPECT: Record<BrandLogoVariant, number> = {
  mark: 1,
  lockup: 2208 / 571,
  wordmark: 1461 / 441,
};

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  tone?: BrandLogoTone;
  height?: number;
  className?: string;
  priority?: boolean;
};

function resolveTone(
  tone: BrandLogoTone,
  resolvedTheme: "light" | "dark" | undefined,
): "color" | "white" | "black" {
  if (tone !== "auto") return tone;
  return resolvedTheme === "dark" ? "white" : "color";
}

export function BrandLogo({
  variant = "mark",
  tone = "auto",
  height = 32,
  className,
  priority,
}: BrandLogoProps) {
  const theme = useThemeOptional();
  const resolved = resolveTone(tone, theme?.resolved);
  const src = ASSETS[variant][resolved];
  const width = Math.round(height * ASPECT[variant]);

  return (
    <Image
      src={src}
      alt="Pantri"
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{ height, width: "auto" }}
    />
  );
}
