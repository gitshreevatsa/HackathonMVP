/* pages/_app.js */
import "../styles/globals.css";
import Link from "next/link";
import { useState } from "react";
import db from "../db";
import Home from ".";

function MyApp({ Component, pageProps }) {


  return (
    <div>
      <nav className="border-b p-6">
        <h1 className="text-4xl font-bold">WE=IR</h1>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">Home</a>
          </Link>
          <Link href="/sell-nft">
            <a className="mr-6 text-pink-500">Sell NFT</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">My NFTs</a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-pink-500">Dashboard</a>
          </Link>

        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;







// function fetchmarketItems() public view returns (marketItem[] memory) {
//   uint itemCount = _tokenIds.current();
//   uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
//   uint currentIndex = 0;

//   marketItem[] memory items = new marketItem[](unsoldItemCount);
//   for (uint i = 0; i < itemCount; i++) {
//     if (marketItem[i + 1].owner == address(this)) {
//       uint currentId = i + 1;
//       marketItem storage currentItem = marketItem[currentId];
//       items[currentIndex] = currentItem;
//       currentIndex += 1;
//     }
//   }
//   return items;
// }

// /* Returns only items that a user has purchased */
// function fetchMyNFTs() public view returns (marketItem[] memory) {
//   uint totalItemCount = _tokenIds.current();
//   uint itemCount = 0;
//   uint currentIndex = 0;

//   for (uint i = 0; i < totalItemCount; i++) {
//     if (marketItem[i + 1].owner == msg.sender) {
//       itemCount += 1;
//     }
//   }

//   marketItem[] memory items = new marketItem[](itemCount);
//   for (uint i = 0; i < totalItemCount; i++) {
//     if (marketItem[i + 1].owner == msg.sender) {
//       uint currentId = i + 1;
//       marketItem storage currentItem = marketItem[currentId];
//       items[currentIndex] = currentItem;
//       currentIndex += 1;
//     }
//   }
//   return items;
// }

// /* Returns only items a user has listed */
// function fetchItemsListed() public view returns (marketItem[] memory) {
//   uint totalItemCount = _tokenIds.current();
//   uint itemCount = 0;
//   uint currentIndex = 0;

//   for (uint i = 0; i < totalItemCount; i++) {
//     if (marketItem[i + 1].seller == msg.sender) {
//       itemCount += 1;
//     }
//   }

//   marketItem[] memory items = new marketItem[](itemCount);
//   for (uint i = 0; i < totalItemCount; i++) {
//     if (marketItem[i + 1].seller == msg.sender) {
//       uint currentId = i + 1;
//       marketItem storage currentItem = marketItem[currentId];
//       items[currentIndex] = currentItem;
//       currentIndex += 1;
//     }
//   }
//   return items;
// }