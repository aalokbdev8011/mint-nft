"use client";

import { useState } from "react";
import Image from "next/image";
import { Contract } from "ethers";
import { create } from "ipfs-http-client";
import ContractABI from "../utils/ERC721_ABI.json";


const ContractAddress = "your contract address";

const projectId = "your project id";
const projectSecret = "your project secret";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
});

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Minting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState<any>(null);

  const handleImageChange = (event: any) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setImage(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
      } else {
        event.target.value = "";
        alert("Please select a valid image file.");
      }
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement | null;
    fileInput?.click();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!name || !description || !image) {
      return alert("All fields are required");
    }
    setIsModalOpen(true);
  };

  const mintNFT = async () => {
   await uploadToIPFS(image);
  };

  const uploadToIPFS = async (file: any) => {
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io:5001/api/v0/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const createOpenSeaMetadata = (
    name: string,
    description: string,
    ipfsHash: string
  ): Record<string, any> => {
    try {
      const metadata = {
        name: name,
        description,
        image: `ipfs://${ipfsHash}`,
      };

      return metadata;
    } catch (error) {
      console.log("Error creating OpenSea metadata:", error);
      throw error;
    }
  };

  const callMintingFunction = async (
    imageIPFSHash: string,
    metadataIPFSHash: string
  ) => {
    try {
      const contractABI: any = [ContractABI];
      const { Web3Provider } = require("ethers/providers");
      const walletProvider = new Web3Provider(window.ethereum);
      const signer = walletProvider.getSigner();
      const contract = new Contract(ContractAddress, contractABI, signer);
      const transaction = await contract.mint(imageIPFSHash, metadataIPFSHash);
      await transaction.wait();
      alert("Minting successful!");
    } catch (error) {
      console.log("Error calling minting function:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="border border-white rounded-[16px] p-[44px] text-center mt-5 mb-10 mx-2">
        <h3 className="text-[44px] page-title">MINT NEW NFT</h3>
        <div className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem
          tortor quis amet scelerisque vivamus egestas.
        </div>
      </div>

      <div className="max-w-md p-8 rounded-md mx-auto">
        {true ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="file"
                id="imageInput"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <div
                className="text-white cursor-pointer rounded-md border border-dashed border-gray-500 bg-gray-800
                                 h-[94px] flex flex-col items-center justify-center"
                onClick={handleUploadClick}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_0_1206)">
                      <path
                        d="M0.499756 10.5614C0.632364 10.5614 0.759541 10.6141 0.853309 10.7078C0.947077 10.8016 0.999756 10.9288 0.999756 11.0614V13.5614C0.999756 13.8266 1.10511 14.081 1.29265 14.2685C1.48019 14.456 1.73454 14.5614 1.99976 14.5614H13.9998C14.265 14.5614 14.5193 14.456 14.7069 14.2685C14.8944 14.081 14.9998 13.8266 14.9998 13.5614V11.0614C14.9998 10.9288 15.0524 10.8016 15.1462 10.7078C15.24 10.6141 15.3671 10.5614 15.4998 10.5614C15.6324 10.5614 15.7595 10.6141 15.8533 10.7078C15.9471 10.8016 15.9998 10.9288 15.9998 11.0614V13.5614C15.9998 14.0918 15.789 14.6005 15.414 14.9756C15.0389 15.3507 14.5302 15.5614 13.9998 15.5614H1.99976C1.46932 15.5614 0.960615 15.3507 0.585542 14.9756C0.21047 14.6005 -0.000244141 14.0918 -0.000244141 13.5614V11.0614C-0.000244141 10.9288 0.0524343 10.8016 0.146202 10.7078C0.239971 10.6141 0.367148 10.5614 0.499756 10.5614Z"
                        fill="white"
                      />
                      <path
                        d="M7.64541 1.80742C7.69186 1.76085 7.74703 1.72391 7.80778 1.6987C7.86852 1.6735 7.93364 1.66052 7.99941 1.66052C8.06518 1.66052 8.1303 1.6735 8.19104 1.6987C8.25179 1.72391 8.30697 1.76085 8.35341 1.80742L11.3534 4.80742C11.4473 4.9013 11.5 5.02864 11.5 5.16142C11.5 5.29419 11.4473 5.42153 11.3534 5.51542C11.2595 5.6093 11.1322 5.66205 10.9994 5.66205C10.8666 5.66205 10.7393 5.6093 10.6454 5.51542L8.49941 3.36842V12.1614C8.49941 12.294 8.44673 12.4212 8.35296 12.515C8.2592 12.6087 8.13202 12.6614 7.99941 12.6614C7.8668 12.6614 7.73963 12.6087 7.64586 12.515C7.55209 12.4212 7.49941 12.294 7.49941 12.1614V3.36842L5.35341 5.51542C5.30692 5.5619 5.25173 5.59878 5.19099 5.62394C5.13026 5.6491 5.06515 5.66205 4.99941 5.66205C4.93367 5.66205 4.86857 5.6491 4.80783 5.62394C4.74709 5.59878 4.6919 5.5619 4.64541 5.51542C4.59892 5.46893 4.56205 5.41374 4.53689 5.353C4.51173 5.29226 4.49878 5.22716 4.49878 5.16142C4.49878 5.09567 4.51173 5.03057 4.53689 4.96983C4.56205 4.90909 4.59892 4.8539 4.64541 4.80742L7.64541 1.80742Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_1206">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(-0.000244141 0.661377)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>Upload Image</div>
                </div>
              </div>
            </div>

            {imagePreview && (
              <div className="mb-4">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            )}

            <div className="mb-4">
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-500 bg-gray-800 p-2 h-[59px] text-white"
                placeholder="NFT"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                id="description"
                className="w-full rounded-md border border-gray-500 bg-gray-800 p-2 h-[157px] text-white"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <button className="rounded-md bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg text-white p-3 flex mx-auto">
              Mint and list immediately
            </button>
          </form>
        ) : (
          <button className="rounded-md bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg text-white p-3">
            Connect Wallet
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-black w-[457px] p-8 rounded-lg relative">
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
            <div className="mr-4 text-white">
              <Image
                src={imagePreview}
                alt="User"
                className="rounded-md object-contain"
                width={400}
                height={0}
              />
              <div className="mb-2 text-[22px] font-bold uppercase mt-2">
                {name}
              </div>
              <div>{description}</div>
              <button
                onClick={mintNFT}
                className="rounded-md bg-gradient-to-r from-purple-600 to-pink-500
                             shadow-lg text-white px-6 py-2 flex mx-auto mt-2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Minting;
