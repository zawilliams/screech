import { useState, useCallback } from "react";
import contractABI from "../abi/Screech.json";
// import { useWeb3React } from "@web3-react/core";
// import { Contract } from "@ethersproject/contracts";
// import { useTwitterContract } from './useContract';
import { useContractRead, useContractWrite } from 'wagmi';

// const contractAddress = '0x9c7A71C7bB4C6b2b2C466744c9Eb06bd4A926dC3';
const contractAddress = '0x145EC9D07d9e4edd28Df025c6665741dE9b2Ef2b';
// const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractConfig = {
  addressOrName: contractAddress,
  contractInterface: contractABI.abi,
};

export function useScreeches() {
  const { data, isLoading } = useContractRead(contractConfig, 'getAllTweets');
  let screechesCleaned = [];

  console.log(data);
  /*
   * We only need address, timestamp, and message in our UI so let's
   * pick those out
   */
  if (data) {
    // console.log('1 scr', data);
    // data.forEach(screech => {
    //   screechesCleaned.push({
    //     owner: screech.owner,
    //     id: screech.id,
    //     timestamp: screech.timestamp,
    //     likes: screech.likes,
    //     text: screech.text,
    //   });
    // });

    // console.log('screeches', screechesCleaned, data);

    screechesCleaned.sort(function(a, b) {
      return new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000);
    });
  }

  return {
    data: screechesCleaned,
    loading: isLoading,
  };
}

export function useCreateScreech() {
  const { data, isError, isLoading, write } = useContractWrite(contractConfig, 'createTweet');
  const createScreech = (value) => write({ args: [value] });

  return {
    createScreech,
    loadingCreateScreech: isLoading,
  }
}

export default function useScreech() {
  // const { library, account } = useWeb3React();

  // const [tweets, setTweets] = useState([]);

  // const getAllTweets = useCallback(
  //   async () => {
  //     console.log('get itttt');
  //     try {
  //       const tweets = await twitterContract?.getAllTweets();

        // /*
        //  * We only need address, timestamp, and message in our UI so let's
        //  * pick those out
        //  */
        // let tweetsCleaned = [];
        // tweets.forEach(tweet => {
        //   tweetsCleaned.push({
        //     owner: tweet.owner,
        //     id: tweet.id,
        //     timestamp: tweet.timestamp,
        //     likes: tweet.likes,
        //     text: tweet.text,
        //   });
        // });

        // tweetsCleaned.sort(function(a, b) {
        //   return new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000);
        // });

  //       setTweets(tweetsCleaned);
  //       console.log("Retrieved tweets...", tweets);
  //       // return addTransaction(tx, { summary: 'Serve' })
  //     } catch (error) {
  //       return error;
  //     }
  //   },
  //   [twitterContract]
  // );

  // function to invoke a mutating method on our contract
  // const createTweet = useCallback(
  //   async (text) => {
  //     try {
  //       const tweet = await twitterContract?.createTweet(text);
  //       await tweet.wait(); // wait for mining
  //       console.log('tweet created');
  //     } catch (error) {
  //       console.log(error);
  //       return error;
  //     }
  //   },
  //   [twitterContract]
  // );

  // const likeTweet = async (id) => {
  //   const like = await twitterContract.like(id);
  //   await like.wait();

  //   console.log("Liked tweet...", like);
  //   // getAllTweets();
  // }

  // useEffect(() => {
  //   // this is only run once on component mounting
  //   const setup = async () => {
  //     // const provider = new ethers.providers.JsonRpcProvider();
  //     // const network = await provider.getNetwork();
  //     // const contractAddress = artifact.networks[network.chainId].address;
  //     // return new Contract(address, ABI, library.getSigner(account));
  //     // await account;
  //     // instantiate contract instance and assign to component ref variable
  //     // contract.current = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ABI.abi, library.getSigner(account));
  //     // useContract(, ABI.abi);

  //     // update count on UI
  //     getAllTweets();
  //   };
  //   setup();
  // }, []);
  // getAllTweets();
  // return {
  //   tweets,
  //   createTweet,
  //   likeTweet,
  //   getAllTweets,
  // };
}
