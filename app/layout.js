import "./globals.css";
import { Sora, Fraunces } from "next/font/google";
import ThemeProvider from "../components/ThemeProvider";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata = {
  title: "Shopelp - Inventory & Profit Management",
  description: "Manage inventory, purchases, pricing, and profits with clarity.",
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
