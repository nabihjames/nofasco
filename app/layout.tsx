import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { ApolloWrapper } from "../providers/ApolloWrapper";
import MyReactQueryProvider from "@/providers/MyReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nosafco Store",
  description:
    "Boutique en ligne de papeterie général, d'article scolaire, de fourniture de bureau et consommable informatique www.chebaani.com",
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
          href="https://fonts.cdnfonts.com/css/gilroy-bold"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/gilroy-medium"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/gilroy-normal"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col py-4 bg-white">
          <Navbar />
          <div className="flex flex-col px-5">
            <MyReactQueryProvider>
              <CookiesProvider>
                <ApolloWrapper>{children}</ApolloWrapper>
              </CookiesProvider>
              <ToastContainer />
            </MyReactQueryProvider>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
