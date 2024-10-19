'use client'

import { useState, useEffect } from 'react';
import { socket } from './socket';
import { pumpfunNewTrade, tradeList } from '../lib/definitions';
import { LatestTrades } from '../components/LatestTrades';
import { formatTime, validateMint } from '../lib/utils';
import { SiSolana } from "react-icons/si";

const timeAtLaunch = Date.now()

export default function Dashboard() {
  const [tradeCount, setTradeCount] = useState(0);
  const [storedTrades, setTrade] = useState<tradeList>({});
  const [solPrice, setSolPrice] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentKing, setKing] = useState({mint: '', time: 0});

  function raydiumCheck(list: tradeList) {
    if (Object.keys(list).length <= 0) {
      return
    }
    let highestUsdArray = Object.keys(list).sort((a, b) => list[b].usd_market_cap - list[a].usd_market_cap)

    if (Object.keys(storedTrades).length >= 1) {
      let highestMint = highestUsdArray[0]
      let highestUsd = storedTrades[highestMint].usd_market_cap
      if (highestUsd >= 57000.00 && storedTrades[highestMint].complete == false) {
        const fetchUrl = 'https://frontend-api.pump.fun/coins/';
        fetch(`${fetchUrl + highestMint}`, { cache: 'force-cache' })
        .then((res) => res.json())
        .then((data) => {
          if (data.complete) {
            console.log(`Hit Raydium: ${highestMint}`)

            setTrade((prev) => ({
              ...prev,
              [highestMint]: {
                complete: true,
                }
              })
            );

            console.log(storedTrades[highestMint].complete)
          }
        })
      }
    }
    // if (obj.usd_market_cap >= 43000.00 && obj.complete == false) { // TODO: Calculate the bonding curve
    //   console.log('Fetching coin, over $50k')
    //   const fetchCoin = validateMint(obj.mint)
    //   console.log(fetchCoin)
    // }
  }

  function onTrade(obj: pumpfunNewTrade) {
    if (obj.king_of_the_hill_timestamp) { if (obj.king_of_the_hill_timestamp > currentKing.time) { setKing({mint: obj.mint, time: obj.king_of_the_hill_timestamp}) } }

    setTradeCount((prevCount) => prevCount + 1); // Count every trade received on the websocket

    if (!storedTrades[obj.mint]) { // If mint doesn't exist, add to storedTrades with init values to count
      setTrade((prev) => ({ 
        ...prev, 
        [obj.mint]: 
          {
            count: 1,
            buyCount: obj.is_buy ? 1 : 0,
            sellCount: !obj.is_buy ? 1 : 0,
            ...obj
          }
        }));
    } else {
        if (obj.user !== storedTrades[obj.mint].user) { // Conditional to prevent bump bot spam TODO: Needs better implementation, too many bots still.
          setTrade((prev) => ({
            ...prev,
            [obj.mint]: {
              count: prev[obj.mint].count + 1,
              buyCount: obj.is_buy ? prev[obj.mint].buyCount + 1 : prev[obj.mint].buyCount,
              sellCount: !obj.is_buy ? prev[obj.mint].sellCount + 1 : prev[obj.mint].sellCount,
              ...obj
            }
          })
        );
      }
    }
  }

  // Pump fun changes have broken this code, needs to be authentication with cookies.
  // useEffect(() => { // Fetch Solana price
  //   fetch('https://frontend-api.pump.fun/sol-price', { next: { revalidate: 3600 } })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSolPrice(data.solPrice)
  //       setLoading(false)
  //     })
  // }, [])

  useEffect(() => { // Listen to WS for messages and stop when unmounted
    socket.on('tradeCreated', onTrade);
    return () => {
      socket.off('tradeCreated', onTrade);
    };
  });

  // if (isLoading) return <p>Loading...</p>
  // if (!solPrice) return <p>No solana price data</p>

  return (
    <div className="App">
      <button onClick={() => {raydiumCheck(storedTrades)}}>Fetch</button>
      <p>{tradeCount} trades since {formatTime(timeAtLaunch)}</p> <p className='flex gap-1 items-center'><SiSolana /> ${solPrice}</p>
      <p>Current king: {currentKing.mint} since {formatTime(currentKing.time)}</p>
      <LatestTrades storedTrades={storedTrades} solPrice={solPrice} />
    </div>
  );
}

