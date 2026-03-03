import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bytes Share — Free Online Notepad to Share Text & Code Instantly",
  description:
    "A free online notepad to share text, code snippets, and notes instantly. Paste your content, get a shareable link in seconds — no sign-up required. Works across all devices. Clips auto-expire in 24 hours.",
  keywords: [
    "online notepad",
    "share text online",
    "share code snippets",
    "shareable link",
    "internet clipboard",
    "paste online",
    "free notepad",
    "share notes",
    "text sharing tool",
    "code sharing",
    "clipboard online",
    "temporary paste",
    "no sign-up notepad",
    "cross-device clipboard",
  ],
  openGraph: {
    title: "Bytes Share — Free Online Notepad to Share Text & Code",
    description:
      "Paste text or code, get a shareable link in seconds. No sign-up, no install — works on any device. Auto-expires in 24 hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-pattern" />
        <div className="grid-overlay" />
        {children}
        <footer className="footer">
          Bytes Share — Your instant internet clipboard
        </footer>
      </body>
    </html>
  );
}
