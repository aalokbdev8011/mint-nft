'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "your project id",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen page-wrapper">
          <div className="max-w-[1200px] mx-auto w-full mb-20">
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={chains}>
                <Navbar />
                <main className="flex-grow">{children}</main>
              </RainbowKitProvider>
            </WagmiConfig>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;