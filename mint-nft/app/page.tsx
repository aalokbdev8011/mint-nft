"use client";

import Image from "next/image";
import { Card } from "./assets";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <>
      <div>
        <h3 className="text-[44px] font-bold border border-white rounded-[16px] p-[44px] page-title text-center mt-5 mb-10 mx-2">
          Listing Owned NFTs
        </h3>
        <div className="flex flex-wrap w-full mb-10">
          <div
            className="w-1/4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-full card rounded-[5px] p-3 h-[325px]">
              <Image src={Card} alt="" className="w-full" />
              <p className="text-[16px] font-bold text-white pt-2">
                Dorippa Panthera
              </p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-black w-[1088px] p-8 rounded-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex mb-4">
              <div className="mr-4">
                <Image
                  src={Card}
                  alt="User"
                  className="w-[485px] h-[285px] rounded-md"
                />
                <select className="mt-2 p-2 text-white rounded-md w-full border border-gray-500 bg-gray-800">
                  <option value="details">Details</option>
                </select>
              </div>

              <div className="text-white">
                <div className="mb-2 text-[22px] font-bold uppercase">
                  John Doe
                </div>
                <div className="text-[16px] font-semibold uppercase">
                  Description
                </div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                  a habitant a consequat elementum nisl. Phasellus facilisis
                  urna facilisis aliquet enim congue. Libero amet proin
                  phasellus pretium.
                </div>
                <div className="border-b mt-2 bg-opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
