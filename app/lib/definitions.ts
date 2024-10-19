// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type tradeList = {
  [key: string]: any
}

export type pumpfunNewTrade = {
  signature: string,
  sol_amount: number,
  token_amount: number,
  is_buy: true,
  user: string,
  timestamp: number,
  mint: string,
  virtual_sol_reserves: number,
  virtual_token_reserves: number,
  tx_index: number,
  name: string,
  symbol: string,
  description?: undefined | string,
  image_uri: string,
  metadata_uri: string,
  twitter?: undefined | string,
  telegram?: undefined | string,
  bonding_curve: string,
  associated_bonding_curve: string,
  creator: string,
  created_timestamp: number,
  raydium_pool?: undefined | number,
  complete: boolean,
  total_supply: number,
  website?: undefined | string,
  show_name: boolean,
  king_of_the_hill_timestamp: undefined | number,
  market_cap: number,
  reply_count: number,
  last_reply: number,
  nsfw: boolean,
  market_id?: undefined | number,
  inverted?: undefined | boolean,
  creator_username?: undefined | string,
  creator_profile_image?: undefined | string,
  usd_market_cap: number
}

// {
//   "mint": "CRAjVj659epLYBdxSNzho3Zii83dVRgkBY9Ejtykpump",
//   "name": "loxdubzim",
//   "symbol": "ldz",
//   "description": "Loxdubzim zims through the market with double the fun. Double up with loxdubzim!",
//   "image_uri": "https://cf-ipfs.com/ipfs/QmWbT46irDBRjQ8uKApiVcoBmA7rCTPdfZj48b7pUtBcDi",
//   "metadata_uri": "https://cf-ipfs.com/ipfs/QmZthe9Lp4GDQS58E6FNASQvSitN96Qfcm7vdkXa4TMGXJ",
//   "twitter": "https://x.com/loxdubzim",
//   "telegram": "https://t.me/+KpT003ouGjRmNDBk",
//   "bonding_curve": "DAX6kSjXaPnuv6CQQ8tvyNJHdcimhGWdgS4VWFdrWw4Z",
//   "associated_bonding_curve": "Dndb4nvF1jXnBLz51mDTDxanCwBgomoqtN3RUuHDcTyJ",
//   "creator": "5S3PwsnzGc57zET2gN6mKxepc3o5N7nUsdgqBewgQZJp",
//   "created_timestamp": 1718161821267,
//   "raydium_pool": null,
//   "complete": false,
//   "virtual_sol_reserves": 30000000000,
//   "virtual_token_reserves": 1073000000000000,
//   "hidden": null,
//   "total_supply": 1000000000000000,
//   "website": "https://loxdubzim.xyz",
//   "show_name": true,
//   "last_trade_timestamp": null,
//   "king_of_the_hill_timestamp": null,
//   "market_cap": 27.958993476,
//   "nsfw": false,
//   "market_id": null,
//   "inverted": null,
//   "real_sol_reserves": 0,
//   "real_token_reserves": 793100000000000,
//   "livestream_ban_expiry": 0,
//   "last_reply": null,
//   "reply_count": 0,
//   "usd_market_cap": 4178.75116492296
// }