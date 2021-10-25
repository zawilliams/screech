import 'tailwindcss/tailwind.css'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const App = ({ Component, pageProps }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="bg-[#FFF0E7] min-h-screen py-4">
      <main className="max-w-lg px-4 mx-auto">
        <div className="flex items-center justify-between">
          <svg className="w-16 h-16 mr-4" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150">
            <path d="M70 5.5h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-40 1h20m10 0h20m-50 1h20m10 0h8m1 0h11m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-40 1h20m20 0h10m-50 1h20m20 0h10m-50 1h20m20 0h10m-50 1h20m20 0h10m-50 1h20m20 0h10m-50 1h20m20 0h1m1 0h8m-50 1h20m20 0h10m-50 1h20m20 0h10m-50 1h20m20 0h10m-50 1h20m20 0h10m-60 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-70 1h20m40 0h10m-80 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h30m50 0h20m-100 1h30m50 0h20m-100 1h30m50 0h20m-100 1h30m50 0h20m-100 1h30m50 0h20m-100 1h30m50 0h6m1 0h13m-100 1h30m50 0h20m-100 1h30m50 0h20m-100 1h24m1 0h5m50 0h20m-100 1h30m50 0h20m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h10m-110 1h30m70 0h1m1 0h8m-110 1h30m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h10m70 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-110 1h10m10 0h20m60 0h10m-100 1h50m20 0h20m-90 1h50m20 0h20m-90 1h50m20 0h20m-90 1h38m1 0h11m21 0h19m-90 1h50m20 0h20m-90 1h50m20 0h14m1 0h5m-90 1h50m20 0h20m-90 1h50m20 0h20m-90 1h48m1 0h1m20 0h20m-90 1h50m20 0h20m-60 1h50m-50 1h50m-50 1h21m1 0h28m-50 1h29m1 0h20m-50 1h11m1 0h38m-50 1h13m1 0h36m-50 1h50m-50 1h50m-50 1h50m-50 1h50" stroke="#ff074e"/>
            <path d="M70 15.5h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m0 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-30 1h40m-40 1h40m-40 1h40m-40 1h40m-40 1h40m-40 1h40m-40 1h40m-40 1h38m1 0h1m-40 1h40m-40 1h1m1 0h38m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-20 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h1m1 0h8m-10 1h10m-40 1h10m50 0h10m-70 1h10m50 0h7m1 0h2m-70 1h10m50 0h10m-70 1h10m50 0h10m-70 1h10m50 0h10m-70 1h10m50 0h10m-70 1h10m50 0h10m-70 1h10m50 0h10m-70 1h10m50 0h10m-70 1h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m10 0h10m50 0h10m-90 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10m-40 1h10m20 0h10" stroke="#7d2953"/>
            <path d="M88 16.5h1m37 44h1m-63 3h1m45 35h1m-28 12h1" stroke="#ff064e"/>
            <path d="M101 30.5h1m-3 78h1m-19 1h1" stroke="#ff074f"/>
            <path d="M108 42.5h1m-38 2h1m19 19h1m35 3h1" stroke="#7c2953"/>
            <path d="M60 45.5h20m30 0h20m-70 1h20m30 0h20m-70 1h20m30 0h20m-70 1h20m30 0h20m-70 1h20m30 0h20m-70 1h20m30 0h17m1 0h2m-70 1h20m30 0h20m-70 1h20m30 0h20m-70 1h20m30 0h20m-70 1h20m30 0h20m-60 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m11 0h19m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h13m1 0h6m-50 1h20m10 0h20m-50 1h20m10 0h20m-50 1h20m10 0h20m-110 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h8m1 0h1m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h10m60 0h10m10 0h10m-100 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h16m1 0h3m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-9 1h9m-10 1h10m-10 1h10m-10 1h8m1 0h1m-20 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10" stroke="#000"/>
            <path d="M127 50.5h1m-15 11h1m-94 30h1m7 3h1" stroke="#010000"/>
            <path d="M100 58.5h1" stroke="#000100"/>
            <path d="M88 70.5h1m-63 9h1" stroke="#000001"/>
            <path d="M131 73.5h1m-54 25h1m45 2h1m-37 3h1m2 4h1" stroke="#fe074e"/>
            <path d="M90 75.5h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-20 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-30 1h30m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h4m1 0h15m-20 1h20m-20 1h20m-20 1h20" stroke="#ffa108"/>
            <path d="M100 75.5h10m-10 1h10m-10 1h10m-10 1h5m1 0h4m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m-10 1h10m0 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h6m1 0h13m-20 1h20" stroke="#feeb2c"/>
            <path d="M105 78.5h1" stroke="#feea2c"/>
            <path d="M116 93.5h1" stroke="#ffeb2c"/>
            <path d="M94 101.5h1" stroke="#ffa109"/>
            <path d="M30 105.5h20m70 0h10m-100 1h20m70 0h10m-100 1h7m1 0h12m70 0h10m-100 1h20m70 0h10m-100 1h20m70 0h10m-100 1h20m70 0h10m-100 1h20m70 0h10m-100 1h20m70 0h10m-100 1h20m70 0h10m-100 1h20m70 0h10m-120 1h28m1 0h7m1 0h13m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-130 1h50m50 0h30m-100 1h80m-80 1h80m-80 1h80m-79 1h79m-80 1h80m-80 1h8m1 0h71m-80 1h80m-80 1h80m-80 1h80m-80 1h2m1 0h77m-60 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50" stroke="#5f5750"/>
            <path d="M50 105.5h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-20 1h20m-10 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50m-50 1h50" stroke="#ffcaa8"/>
            <path d="M37 107.5h1m0 8h1m3 19h1" stroke="#5f5650"/>
            <path d="M46 115.5h1m1 15h1" stroke="#5e5750"/>
            <path d="M40 128.5h1" stroke="#5f5751"/>
          </svg>
          <span className="text-2xl font-bold tracking-widest uppercase sr-only text-rose-500">
            Screech
          </span>

          {/*
          * If there is no currentAccount render this button
          */}
          {currentAccount
            ?
              (
                <div className="text-rose-300">
                  {currentAccount}
                </div>
              )
            :
              (
                <button onClick={connectWallet} type="button" className="inline-flex items-center px-4 py-2 mt-4 font-medium tracking-widest text-white border border-transparent rounded-full shadow-sm bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
                  Connect Wallet
                </button>
              )
          }
        </div>

        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default App;
