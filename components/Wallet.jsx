import React, { useMemo, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from "@ethersproject/contracts";

import { Networks, shorter, TOKENS_BY_NETWORK } from '../utils';
import fetcher from 'swr-eth';
import { SWRConfig } from 'swr';
import ERC20ABI from '../abi/Twitter.json';
import { EthBalance } from './EthBalance';
import { TokenList } from './TokenList'
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useInactiveListener } from '../hooks/useInactiveListener';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
  ],
});

export const Wallet = () => {
  const {
    chainId,
    account,
    library,
    activate,
    active,
    connector,
  } = useWeb3React<Web3Provider>();

  // [
  //   [ 0x00001, JSONABI ]
  // ]
  const ABIs = useMemo(() => {
    return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(
      ({ address, abi }) => [address, abi]
    );
  }, [chainId]);

  const onClick = () => {
    activate(injectedConnector);
  }

  console.log({ABIs});
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    console.log('Wallet running')
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
    console.log(library);

    // const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, ERC20ABI, library.getSigner());
  }, [activatingConnector, connector]);

  // mount only once or face issues :P
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  // const fromMe = contract.filters.Transfer(account, null);

  return (
    <div>
      {/* <div>ChainId: {chainId}</div> */}
      {/* <div>Account: {shorter(account)}</div> */}
      {active ? (
        <div className="text-rose-300">
            {shorter(account)}
        </div>
      ) : (
        <button type="button" onClick={onClick} className="inline-flex items-center px-4 py-2 mt-4 font-medium tracking-widest text-white uppercase border border-transparent rounded-md shadow-sm bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
          Connect Wallet
        </button>
      )}
      {active && (
        <SWRConfig value={{ fetcher: fetcher(library, new Map(ABIs)) }}>
          {/* <EthBalance /> */}
          {/* <TokenList chainId={chainId} /> */}
        </SWRConfig>
      )}
    </div>
  )
}
