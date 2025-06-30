import type { Metadata } from "next";
/* import localFont from "next/font/local"; */
import { DM_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import ToastComponent from "@/components/ToastComponent";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmSansBold",
  weight: "700",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-openSansRegular",
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dmSans",
  weight: "400",
});
/* const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
}); */

export const metadata: Metadata = {
  title: "Kikae",
  description: "Kikae",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="../assets/favicon.png"
          //type="image/<generated>"
          // sizes="<generated>"
        />
      </head>
      <body
        className={`${openSans.variable} ${dm_sans.variable} ${dmSans.variable}  antialiased bg-lightWhite`}
      >
        <ToastComponent />

        {children}
      </body>
    </html>
  );
}
