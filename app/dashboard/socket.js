import { io } from "socket.io-client";

// Old link found from an earlier date of network traffic
// const URL = "wss://client-api-2-74b1891ee9f9.herokuapp.com";
const URL = "https://frontend-api.pump.fun"

// This codeblock doesn't work since changes were made to the API
// export async function fetchSolPrice() {
//     await fetch(`https://frontend-api.pump.fun/sol-price`, { cache: 'no-store' }).then(res => {
//         if (!res.ok) {
//             throw new Error('Error fetching frontend pumpfun API, Solana Price endpoint');
//         }
//         return res.json();
//     })
//   }

export const socket = io(URL, { 
    transports: ["websocket"],
    autoConnect: true 
});




