"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between py-4 mx-2">
        <div
          className="text-white font-cinzel text-4xl font-bold leading-[146.523%] cursor-pointer"
          onClick={() => router.push("/")}
        >
          NFT
          <span
            className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent 
                 font-cinzel text-4xl font-bold leading-[146.523%] mx-2"
          >
            SEA
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="text-white cursor-pointer"
            onClick={() => router.push("/minting")}
          >
            Minting
          </div>
          <ConnectButton />;
        </div>
      </div>
    </>
  );
};
export default Navbar;
