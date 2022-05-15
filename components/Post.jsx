import { useState, useCallback } from 'react';
// import { useWeb3React } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";
// import ERC20ABI from "../abi/Twitter.json";
import { useCreateScreech } from "../hooks/useScreech";

export default function Post() {
  // const { library } = useWeb3React<Web3Provider>();
  const [tweetText, setTweetText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const characterLimit = 240;
  const { createScreech, loadingCreateScreech } = useCreateScreech();
//   const { createTweet } = useTwitter();

  const setContent = useCallback(
    text => {
      setCharacterCount(text.length);
      setTweetText(text.slice(0, characterLimit - 1));
    },
    [characterLimit, setTweetText]
  );

  const screech = () => {
    // const contract = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ERC20ABI.abi, library.getSigner());
    // console.log('SCREECH');

    const screech = createScreech(tweetText);
    setTweetText('');

    // const event = screech.events.find(event => event.event === 'NewTweet');
    // const [owner, id, timestamp, tweet] = event.args;
    // console.log('NewTweet', owner, id, timestamp, tweet);

    console.log("Tweeted...", screech);
    // getAllTweets();
  }

  return (
    <div className="flex items-start space-x-4 pb-">
      <div className="flex-1 min-w-0">
        <form action="#" className="relative">
          <div className="overflow-hidden border rounded-lg shadow-sm border-rose-300 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-500">
            <label htmlFor="comment" className="sr-only">
              Post your Screech
            </label>
            <textarea
              rows={3}
              name="screech"
              id="screech"
              placeholder="What's happening?"
              value={tweetText}
              onChange={e => setContent(e.target.value)}
              className="block w-full py-3 text-lg uppercase bg-transparent border-0 resize-none focus:ring-0 placeholder-rose-300 text-rose-600"
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-end space-x-5">
              <div className="flex">
                <div className="text-rose-400">{characterCount}/{characterLimit}</div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button onClick={screech} type="button" className="inline-flex items-center px-4 py-2 font-medium tracking-widest text-white uppercase border border-transparent rounded-md shadow-sm bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
                Screech
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
