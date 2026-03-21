import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useSocket = (ticketId?: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    if (ticketId) {
      socketRef.current.emit('join_ticket', ticketId);
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [ticketId]);

  return socketRef.current;
};
