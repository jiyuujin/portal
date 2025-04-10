import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YUMA Kitamura - Application Developer & Engineering Manager",
  description:
    "Personal portfolio of YUMA Kitamura, an application developer and engineering manager specializing in frontend development with React, Flutter, and DevOps.",
  openGraph: {
    title: "YUMA Kitamura - Application Developer & Engineering Manager",
    description:
      "Personal portfolio of YUMA Kitamura, an application developer and engineering manager specializing in frontend development with React, Flutter, and DevOps.",
    images: [
      {
        url: "https://i.imgur.com/7XpnwSH.jpg",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
