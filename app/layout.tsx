import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

const univers = localFont({
  src: "../public/fonts/UniversLTStd.otf",
  display: "swap",
  variable: "--font-univers"
});

export const metadata: Metadata = {
  title: "D36 Distribution",
  description:
    "D36 Distribution – modern, minimalist distribution platform with an architectural aesthetic."
};

// Initialize theme before hydration to avoid FOUC
const themeInitScript = `
(function() {
  try {
    const storedTheme = window.localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${inter.className} ${univers.variable} theme-transition bg-white text-black antialiased dark:bg-black dark:text-white font-sans`}
      >
        {props.children}
      </body>
    </html>
  );
}

