import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { formatTime, copyToClipboard, formatSolAmount } from '../lib/utils';
import { FaTwitter, FaGlobe, FaPaperPlane, FaRegPaperPlane, FaCommentsDollar, FaRegClock } from "react-icons/fa";
import { CiTwitter, CiPill, CiGlobe } from "react-icons/ci";
import Image from 'next/image';

export const LatestTrades = ({ storedTrades, solPrice }) => {
  const [sortedMints, setSortedMints] = useState([]);
  const [tableLimit, setLimit] = useState(20);
  const [sortKey, setSortKey] = useState('count');
  const [filteredMints, setFilteredMints] = useState(sortedMints);
  const [minMarketCap, setMinMarketCap] = useState(0);
  const [maxMarketCap, setMaxMarketCap] = useState(Infinity);
  const [mintFilter, setMintFilter] = useState('');

  useEffect(() => { // Sort the table by the largest TX Count by default, otherwise use sortKey if specified
    const sortedArray = Object.keys(storedTrades).sort((a, b) => storedTrades[b][sortKey] - storedTrades[a][sortKey]);
    setSortedMints(sortedArray.map(mintKey => ({ ...storedTrades[mintKey], mint: mintKey })));
  }, [storedTrades, sortKey]);
  
  useEffect(() => {
    if (sortedMints.length > 0 && mintFilter == '') {
      const filteredArray = sortedMints.filter(
        (mint) =>
          mint.usd_market_cap >= minMarketCap && mint.usd_market_cap <= maxMarketCap
      );
      setFilteredMints(filteredArray);
    } else if (sortedMints.length > 0 && mintFilter != '') {
        const filteredArray = sortedMints.filter(
        (mint) =>
          mint.usd_market_cap >= minMarketCap && mint.usd_market_cap <= maxMarketCap &&
          mint.name.toLowerCase().includes(mintFilter.toLowerCase()) ||
          mint.symbol.toLowerCase().includes(mintFilter.toLowerCase()) ||
          mint.mint.toLowerCase().includes(mintFilter.toLowerCase())
      );
      setFilteredMints(filteredArray);
    }
  }, [sortedMints, minMarketCap, maxMarketCap, mintFilter]);

  return (
    <>
      <div className='py-5'>
        <table className="w-full text-left">
          <thead>
            <tr>
              <td className="px-2 py-2 w-2">
                <input
                  type="number"
                  placeholder='Min market cap (USD)'
                  onChange={(e) => {e.target.value != '' ? setMinMarketCap(parseInt(e.target.value, 10)) : setMinMarketCap(0)}}
                  min={0}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </td>
              <td className="px-2 py-2 w-2">
                <input
                  type="number"
                  placeholder='Max market cap (USD)'
                  onChange={(e) => {e.target.value != '' ? setMaxMarketCap(parseInt(e.target.value, 10)) : setMaxMarketCap(Infinity)}}
                  min={5000}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </td>
              <td className="px-2 py-2 w-2">
                <input
                  type="string"
                  placeholder='Search Mint'
                  onChange={(e) => {setMintFilter((e.target.value))}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </td>
            </tr>
            <tr>
              <th className="px-2 py-2"><select name="limit" onChange={(e) => setLimit(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value="10">Small</option>
                <option value="20">Medium</option>
                <option value="50">Large</option>
              </select></th>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Symbol</th>
              <th className='px-2 py-2'>Unit Price</th>
              <th className={clsx("px-2 py-2", sortKey == 'created_timestamp' && 'bg-mars-black')} onClick={() => {setSortKey('created_timestamp')}}>Created</th>
              <th className={clsx("px-2 py-2", sortKey == 'timestamp' && 'bg-mars-black')} onClick={() => {setSortKey('timestamp')}}>Tx Time</th>
              <th className={clsx("px-2 py-2", sortKey == 'count' && 'bg-mars-black')} onClick={() => {setSortKey('count')}}>Tx Vol</th>
              <th className={clsx("px-2 py-2", sortKey == 'buyCount' && 'bg-mars-green text-mars-black', sortKey == 'sellCount' && 'bg-mars-black text-mars-red')} onClick={() => {sortKey === 'buyCount' ? setSortKey('sellCount') : setSortKey('buyCount')}}>Buy/Sell</th>
              <th className={clsx("px-2 py-2", sortKey == 'market_cap' && 'bg-mars-black')} onClick={() => {setSortKey('market_cap')}}>Market Cap (SOL)</th>
            </tr>
          </thead>
          <tbody>
            {filteredMints.slice(0, tableLimit).map((mint) => (
              <tr key={mint.mint}
                  onClick={(event) => copyToClipboard(mint, event)}>
                <td className="px-2 py-2">
                  <div className='flex gap-4 items-center justify-between'>
                    <a href={`https://pump.fun/${mint.mint}`} className="flex items-center justify-start gap-1" target="_blank">
                      <CiPill className='' />
                      <div className=' border-slate-800 rounded text-sm px-2 bg-mars-black text-mars-orange'>{(mint.mint).slice(0, 12)}...</div>
                    </a>
                    <Image 
                      src={mint.image_uri}
                      width={50}
                      height={50}
                      alt={(mint.description).slice(0,12)}
                    />
                  </div>
                </td>
                <td className="px-2 py-2">{mint.name}
                  <div className="flex flex-row gap-2 items-center">{mint.telegram ? <a href={mint.telegram} className="text-mars-green text-sx" target="_blank"><FaPaperPlane /></a> : <FaRegPaperPlane className='text-mars-red text-sx'/>} {mint.twitter ? <a href={mint.twitter} className="text-mars-green text-sx" target="_blank"><FaTwitter /></a> : <CiTwitter className='text-sx text-mars-red' />} {mint.website ? <a href={mint.website} className="text-mars-green text-sx" target="_blank"><CiGlobe /></a> : <FaGlobe className='text-sx text-mars-red' />}<p className='flex gap-1 text-sm items-center'><FaCommentsDollar className={clsx('', mint.reply_count > 10 ? 'text-mars-green' : 'text-mars-red')} /> {mint.reply_count}</p></div>
                </td>
                <td className="px-2 py-2">${mint.symbol}</td>
                <td className='px-2 py-2'>{((mint.sol_amount / 1000) / mint.token_amount).toFixed(9)}</td>
                <td className="px-2 py-4"><FaRegClock className='text-sm inline-block m-1' /><p className='inline-block'>{formatTime(mint.created_timestamp)}</p></td>
                <td className="px-2 py-2">{formatTime(mint.timestamp * 1000)}</td>
                <td className="px-2 py-2">{mint.count} {(Date.now() / 1000) - mint.timestamp <= 15 ? '🔥' : '💩'}</td>
                <td className="px-2 py-2">
                  <div>
                    <p className={clsx('text-center', mint.is_buy ? 'text-mars-green' : 'text-mars-red' )}>{formatSolAmount(mint.sol_amount).slice(0,5)}</p>
                    <div className="flex justify-center align-middle">
                      <div
                        style={{
                          width: `${(mint.buyCount / (mint.buyCount + mint.sellCount)) * 100}%`,
                          height: '13px',
                        }}
                        className='bg-mars-green'
                      >
                        <p className="text-xs">{mint.buyCount}</p>
                      </div>
                      <div
                        style={{
                          width: `${(mint.sellCount / (mint.buyCount + mint.sellCount)) * 100}%`,
                          height: '13px',
                        }}
                        className='bg-mars-black'
                      >
                        <p className='text-xs text-right'>{mint.sellCount == 0 ? '' : mint.sellCount}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <p>{Math.floor(mint.market_cap)} SOL / ${(mint.usd_market_cap).toFixed(0)}</p>
                  <p className={clsx('text-sm text-center', mint.usdDiff < 0 ? 'text-mars-red' : 'text-mars-green')}></p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};