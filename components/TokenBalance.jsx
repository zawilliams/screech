import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "@ethersproject/providers";
import useSWR from "swr";
import React, {useEffect} from "react";
import {Contract} from "@ethersproject/contracts";
import ERC20ABI from "../abi/Twitter.json";
import {formatUnits} from "@ethersproject/units";

export const TokenBalance = ({symbol, address, decimals}) => {
  const {account, library} = useWeb3React<Web3Provider>()
  const {data: balance, mutate} = useSWR([address, 'balanceOf', account])

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`)
    const contract = new Contract(address, ERC20ABI.abi, library.getSigner())
    console.log('CONTRACT', contract);

    // const fromMe = contract.filters.Transfer(account, null)
    // library.on(fromMe, (from, to, amount, event) => {
    //   console.log('Transfer|sent', {from, to, amount, event})
    //   mutate(undefined, true)
    // })
    // // const toMe = contract.filters.Transfer(null, account)
    // library.on(toMe, (from, to, amount, event) => {
    //   console.log('Transfer|received', {from, to, amount, event})
    //   mutate(undefined, true)
    // })
    // remove listener when the component is unmounted
    return () => {
      // library.removeAllListeners(toMe)
      // library.removeAllListeners(fromMe)
    }
    // trigger the effect only on component mount
  }, [])

  if (!balance) {
    return <div>...</div>
  }
  return (
      <div>
        {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
      </div>
  )
}
