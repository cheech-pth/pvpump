'use client'

import { useState, useEffect } from 'react';
import { socket } from '@/app/dashboard/socket';

export function ConnectionManager() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  const connection = () => {
    socket.connect();
  };

  const disconnection = () => {
    socket.disconnect();
  };

  return (
    <div className="flex gap-2 px-2">
      <p>{isConnected ? "🟢" : "🔴"}</p>
      <button onClick={isConnected ? disconnection : connection}>
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}