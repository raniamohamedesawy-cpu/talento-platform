import { useEffect, useMemo, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getApiBaseUrl } from "../lib/apiBase";

type IncomingMessage = any;

export function useWebSocket(userId: string | null | undefined) {
  const [messages, setMessages] = useState<IncomingMessage[]>([]);
  const stompRef = useRef<any>(null);
  const connectedRef = useRef(false);

  const destination = useMemo(() => {
    if (userId === null || userId === undefined || userId === "") return null;
    return `/topic/messages/${userId}`;
  }, [userId]);

  useEffect(() => {
    if (!destination) return;

    const socket = new SockJS(`${getApiBaseUrl()}/ws`);
    const stompClient = Stomp.over(socket);
    stompRef.current = stompClient;

    stompClient.connect({}, () => {
      connectedRef.current = true;
      stompClient.subscribe(destination, (message: any) => {
        try {
          const body = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        } catch {
          setMessages((prev) => [...prev, message.body]);
        }
      });
    }, (err: any) => {
      console.warn("STOMP connect error:", err);
    });

    return () => {
      try {
        if (stompRef.current && connectedRef.current) {
          stompRef.current.disconnect(() => undefined);
        }
      } catch {
        // ignore
      }
      connectedRef.current = false;
      stompRef.current = null;
    };
  }, [destination]);

  const send = (payload: any) => {
    try {
      if (stompRef.current && connectedRef.current) {
        stompRef.current.send("/app/chat.send", JSON.stringify(payload), {});
        return true;
      }
    } catch (e) {
      console.warn("STOMP send failed:", e);
    }
    return false;
  };

  return { messages, send };
}

