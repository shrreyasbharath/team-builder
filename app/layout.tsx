import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Team Builder",
  description: "Build your ultimate football dream team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
