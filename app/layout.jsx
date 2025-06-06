// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "estudy",
  description: "This is The Best estudy Platform",
};
// ${geistSans.variable} ${geistMono.variable}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
      
          antialiased 
          flex flex-col min-h-screen
        `}
      >
        <Providers>
          <Header />
          <main className="flex-grow ">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
