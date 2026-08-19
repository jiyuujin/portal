import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = "G-MW81V9WMHK";
const ADSENSE_CLIENT_ID = "ca-pub-7095980629133842";

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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
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
