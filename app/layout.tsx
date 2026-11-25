import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "U.S. Department of Justice",
  description: "U.S. Department of Justice",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
