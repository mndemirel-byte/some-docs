import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES } from "./[locale]/theme";
import { ThemeSync } from "./[locale]/theme-sync";
import "./globals.css";

const SET_STORED_THEME_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (${JSON.stringify(THEMES)}.indexOf(stored) !== -1) {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();`;

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Coding Series — Document Library",
  description:
    "Claude Code, skills, TDD, vertical slices, and AFK agent workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={jetBrainsMono.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SET_STORED_THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
