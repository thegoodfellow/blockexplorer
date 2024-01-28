import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [block, setBlock] = useState();
  const [BlockNumber, setBlockNumber] = useState();
  const [hash, setHash] = useState();
  const [nonce, setNonce] = useState();
  const [transactions, setTransactions] = useState();


  useEffect(() => {
    async function getBlock() {
      const numb = await alchemy.core.getBlockNumber();
      setBlock(await alchemy.core.getBlockWithTransactions(numb));
      setBlockNumber(block.number);
      setHash(block.hash);
      setNonce(block.nonce);

      setTransactions(block.transactions);

    }

    getBlock();
  });


  return <div className="App">
    <div id="blockInfo">
      <h3>Block Information</h3>
      <p>Block Number: {BlockNumber}</p>
      <p>Hash:{hash}</p>
      <p>Nonce:{nonce}</p>
    </div>
    <div id="transactions">
      <h3>Transactions:</h3>
      {JSON.stringify(transactions)}
    </div>
  </div>;
}

export default App;
