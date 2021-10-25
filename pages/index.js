import Head from 'next/head'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TwitterABI from '../abi/Twitter.json';
import { format } from 'timeago.js';

export default function Home() {
  const contractAddress = '0x9c7A71C7bB4C6b2b2C466744c9Eb06bd4A926dC3';
  const contractABI = TwitterABI.abi;
  const [tweets, setTweets] = useState([]);
  let twitterContract;

  if (typeof window !== "undefined") {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      twitterContract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  }

  const getAllTweets = async () => {
    const tweets = await twitterContract.getAllTweets();
    setTweets(tweets);
    console.log("Retrieved tweets...", tweets);
  }

  const screech = async () => {
    // const screech = await twitterContract.createTweet("just setting up my screech");
    // await screech.wait();

    // console.log("Tweeted...", screech);
    // getAllTweets();
  }

  const likeTweet = async (id) => {
    const like = await twitterContract.likeTweet(id);
    await like.wait();

    console.log("Liked tweet...", like);
    getAllTweets();
  }

  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <div>
      <Head>
        <title>Screech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-8">
          <textarea name="about" rows="3" placeholder="What's happening?" className="block w-full text-lg uppercase bg-transparent border-2 rounded-md shadow-sm placeholder-rose-300 text-rose-900 border-rose-300 focus:ring-rose-500 focus:border-rose-500"></textarea>
          <div className="text-right">
            <button onClick={() => screech} type="button" className="inline-flex items-center px-4 py-2 mt-4 font-medium tracking-widest text-white border border-transparent rounded-full shadow-sm bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
              Screech
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {tweets.length
            ?
              tweets.map((tweet) => (
                <div className="" key="{tweet.timestamp}">
                  <div className="text-sm text-rose-300"><a href="#" className="underline hover:no-underline">{tweet.owner}</a> · {format(tweet.timestamp.toNumber() * 1000)}</div>
                  <div className="my-2 text-base tracking-widest uppercase text-rose-500">{tweet.text}</div>
                  <a href="#" onClick={(e) => { e.preventDefault(); likeTweet(tweet.id.toNumber()); }} className="inline-flex items-center text-rose-400 hover:text-rose-500">
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24">
                      <path fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z" clipRule="evenodd"></path>
                    </svg>
                    <span className="inline-flex">{tweet.likes.toNumber()}</span>
                  </a>
                </div>
              ))
            :
              <div className="tracking-widest text-center uppercase text-rose-300">No screeches yet</div>
          }
        </div>
    </div>
  )
}
