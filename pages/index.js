import Head from 'next/head';
import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import TwitterABI from '../abi/Twitter.json';
import { format } from 'timeago.js';
import { truncateHash } from '../common/utils';
import Link from 'next/link';

export default function Home() {
  const contractAddress = '0x145EC9D07d9e4edd28Df025c6665741dE9b2Ef2b';
  const contractABI = TwitterABI.abi;
  const [tweets, setTweets] = useState([]);
  const [tweetText, setTweetText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const characterLimit = 240;
  let twitterContract;

  const setContent = useCallback(
    text => {
      setCharacterCount(text.length);
      setTweetText(text.slice(0, characterLimit - 1));
    },
    [characterLimit, setTweetText]
  );

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

    /*
     * We only need address, timestamp, and message in our UI so let's
     * pick those out
     */
    let tweetsCleaned = [];
    tweets.forEach(tweet => {
      tweetsCleaned.push({
        owner: tweet.owner,
        id: tweet.id,
        timestamp: tweet.timestamp,
        likes: tweet.likes,
        text: tweet.text,
      });
    });

    tweetsCleaned.sort(function(a, b) {
      return new Date(b.timestamp * 1000) - new Date(a.timestamp * 1000);
    });

    setTweets(tweetsCleaned);
    console.log("Retrieved tweets...", tweets);
  }

  const screech = async () => {
    const screech = await twitterContract.createTweet(tweetText);
    await screech.wait();
    setTweetText('');

    // const event = screech.events.find(event => event.event === 'NewTweet');
    // const [owner, id, timestamp, tweet] = event.args;
    // console.log('NewTweet', owner, id, timestamp, tweet);

    console.log("Tweeted...", screech);
    // getAllTweets();
  }

  const likeTweet = async (id) => {
    const like = await twitterContract.like(id);
    await like.wait();

    console.log("Liked tweet...", like);
    getAllTweets();
  }

  const listener = (block) => {
    console.log("new action emited");
    console.log(block);
    // getAllActions()
  }

  useEffect(() => {
    getAllTweets();
    twitterContract.on("NewTweet", listener);
    return () => {
      twitterContract.off("NewTweet", listener);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Screech</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-8">
          <textarea
            name="about"
            placeholder="What's happening?"
            value={tweetText}
            onChange={e => setContent(e.target.value)}
            className="block w-full text-lg uppercase bg-transparent border-2 rounded-md shadow-sm h-28 placeholder-rose-300 text-rose-600 border-rose-300 focus:ring-rose-500 focus:border-rose-500"></textarea>
          <div className="flex justify-between">
            <div className="mt-2 text-rose-400">{characterCount}/{characterLimit}</div>
            <button onClick={screech} type="button" className="inline-flex items-center px-4 py-2 mt-4 font-medium tracking-widest text-white border border-transparent rounded-full shadow-sm bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
              Screech
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {tweets.length
            ?
              tweets.map((tweet) => (
                <div className="" key={tweet.id}>
                  <div className="text-sm text-rose-300"><Link href={`/${tweet.owner}/${tweet.id}`}><a className="underline hover:no-underline">{truncateHash(tweet.owner)}</a></Link> · {format(tweet.timestamp.toNumber() * 1000)}</div>
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
