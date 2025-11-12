/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          brand: "#1e0e4f"
        },
        orange: {
          brand: "#d05621"
        },
        crimson: {
          brand: "#730707"
        },
        ink: {
          DEFAULT: "#0f0830"
        },
        steel: {
          DEFAULT: "#c7cbd1"
        }
      },
      backgroundImage: {
        steelTexture: "radial-gradient(ellipse at top left, rgba(255,255,255,0.08), transparent 40%), radial-gradient(ellipse at bottom right, rgba(0,0,0,0.15), transparent 45%)"
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.1)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
}
