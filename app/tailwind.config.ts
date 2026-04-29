import type { Config } from "tailwindcss";

/**
 * Design tokens for the school site.
 *
 * Brand:
 *   plum     — primary text, dark surfaces, primary CTA
 *   rose     — accent only (eyebrows, italics, underlines, small fills)
 *   cream    — page background
 *   ink      — body text (slightly softer than plum for long-form reading)
 *
 * Semantic roles wrap the brand colors so the platform (Phase 3) can
 * reuse the same components with a different brand by swapping these.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // raw brand
        plum: {
          DEFAULT: "#2A1B3D",
          deep: "#1F1430",
          soft: "#3D2654",
        },
        rose: {
          DEFAULT: "#C4477A",
          soft: "#E8A5C0",
          tint: "#F7E4ED",
        },
        cream: {
          DEFAULT: "#FDFBF7",
          warm: "#F5EFE6",
        },
        ink: {
          DEFAULT: "#2A1B3D",
          muted: "rgba(42, 27, 61, 0.7)",
          subtle: "rgba(42, 27, 61, 0.55)",
          line: "rgba(42, 27, 61, 0.08)",
        },

        // semantic roles — components should prefer these
        background: "#FDFBF7",
        surface: "#FFFFFF",
        foreground: "#2A1B3D",
        muted: "rgba(42, 27, 61, 0.7)",
        accent: "#C4477A",
        border: "rgba(42, 27, 61, 0.08)",
      },
      fontFamily: {
        // wired to the next/font instances in src/lib/fonts.ts
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        // editorial type scale — generous, intentional
        "display-xl": ["clamp(2.75rem, 5vw + 1rem, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.25rem, 3.5vw + 1rem, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.005em" }],
        "display-md": ["clamp(1.75rem, 2vw + 1rem, 2.5rem)", { lineHeight: "1.15" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.15em" }],
      },
      letterSpacing: {
        eyebrow: "0.15em",
      },
      maxWidth: {
        prose: "65ch",
        wide: "1240px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
