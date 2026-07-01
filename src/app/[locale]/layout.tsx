import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getMessages } from "@/i18n/get-messages";
import { routing } from "@/i18n/routing";
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES } from "./theme";
import { ThemeSync } from "./theme-sync";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages(locale);

  return (
    <html
      lang={locale}
      data-theme={DEFAULT_THEME}
      className={jetBrainsMono.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SET_STORED_THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeSync />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
