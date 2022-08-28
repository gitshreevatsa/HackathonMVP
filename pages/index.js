/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { setDoc, doc } from "firebase/firestore";
import db from "../db";
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../public/NFTMarketplace.json";

import { getDoc } from "firebase/firestore";

export default function Home() {
  const [accountConnected, setAccountConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [role, setRole] = useState("");
  const[verify, setVerify] = useState("")
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const[prosumer, setProsumer] = useState(false)
  const options = ["Prosumers", "Consumers", "Distributors"];

  async function dbGet() {
    if (accountConnected) {
      console.log(currentAccount)
       const docRef = doc(db, "users", currentAccount)
       console.log("awkkabjkawurhwkaj iuwkurgweuirgwuigrwebhjfhjgewuyrgewugrfuewruiwgrukyqwtiewyg eyjg yewytrawugrkuiwyt7")
      const docSnap = await getDoc(docRef);
      console.log("ukgfjkawbjkwagurbwajfhawguesbgjkesbjavfykgawiaw,j ")

      if(docSnap.exists()){
        const docData = await docSnap.data()
        console.log("*********************************",docSnap.data())
        const roleTaken = docData.role;
        setVerify(roleTaken)
        if(roleTaken === 'Prosumers'){
          setProsumer(true)
        }
      }
    }
  }
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        const data = {
          owner: currentAccount,
          role: role,
        };
        console.log(data);
        await setDoc(doc(db, "users", currentAccount), data);
        setAccountConnected(true);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadNFTs();
    checkIfWalletIsConnected();
  }, [accountConnected, currentAccount]);
  async function loadNFTs() {
    dbGet()
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="flex flex-start">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        {accountConnected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p
                    style={{ height: "64px" }}
                    className="text-2xl font-semibold"
                  >
                    {nft.name}
                  </p>
                  <div style={{ height: "70px", overflow: "hidden" }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">
                    {nft.price} ETH
                  </p>
                  { !prosumer &&
                  <button
                    className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                    onClick={() => buyNft(nft)}
                  >
                    Buy
                  </button>
}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Dropdown
              options={options}
              onChange={(e) => {
                setRole(e.value);
              }}
              placeholder="Select an option"
            ></Dropdown>

            <button onClick={connectWallet}>Connect Wallet </button>
          </>
        )}
      </div>
    </div>
  );
}
