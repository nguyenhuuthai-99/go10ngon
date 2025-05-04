import type { Metadata } from "next";
import { Geist, Chivo_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toast } from "next/dist/client/components/react-dev-overlay/ui/components/toast";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["vietnamese"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["vietnamese", "latin"],
});

export const metadata: Metadata = {
  title: "Go10ngón",
  description: "Ứng dụng gõ 10 ngón cho tiếng Việt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${chivoMono.variable} ${geistSans.variable} ${robotoMono.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
