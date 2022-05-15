import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Post from '../components/Post';
import { useScreeches } from '../hooks/useScreech';

export default function Home() {
  const { data, isLoading } = useScreeches();
  const screeches = [];

// console.log('get all', data);

  return (
    <div>
      <Head>
        <title>SCREECH</title>
        <meta name="description" content="YELL ONLINE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Post />

      <div className="mt-8 space-y-8">
        {screeches.length
          ?
            screeches.map((tweet) => (
              <div className="" key={tweet.id}>
                <div className="text-sm text-rose-300"><Link href={`/${tweet.owner}`}><a className="underline hover:no-underline">{truncateHash(tweet.owner)}</a></Link> · <Link href={`/${tweet.owner}/${tweet.id}`}>{format(tweet.timestamp.toNumber() * 1000)}</Link></div>
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
