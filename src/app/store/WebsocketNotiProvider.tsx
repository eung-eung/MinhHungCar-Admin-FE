'use client'
import { signOut, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import useAxiosAuth from "../utils/hooks/useAxiosAuth";

interface WebSocketContextValue {
    ws: WebSocket | null;
    isConnected: boolean;
    notifications: any;
}

export const WebSocketContext = createContext<WebSocketContextValue>({
    ws: null,
    isConnected: false,
    notifications: []
});

export const WebSocketNotiProvider = ({ children }: { children: React.ReactNode }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState<any>()
    const { data: session } = useSession()
    const axiosAuth = useAxiosAuth()
    useEffect(() => {
        getNotificationList()
    }, [])


    const getNotificationList = async () => {
        const response = await axiosAuth.get('/admin/notifications?offset=0&limit=100')
        console.log(response.data.data);
        setNotifications(response.data.data)
    }
    const handleSocketMessage = (event: MessageEvent) => {
        console.log('event');

        const data = JSON.parse(event.data) as any
        console.log('provider: ', data);
        if (data.msg_type === 'ERROR') {
            signOut()
        } else {
            setNotifications((prev: any) => [...prev, data])
        }

    };

    const handleSocketError = (error: Event) => {
        console.error('WebSocket error:', error)
    };


    useEffect(() => {
        const initSocket = async () => {
            try {
                const newWs = new WebSocket('wss://minhhungcar.xyz/admin/subscribe_notification')

                newWs.onopen = () => {
                    setIsConnected(true)
                    newWs.send(JSON.stringify({ access_token: `Bearer ${session?.access_token}` }))
                }
                newWs.onmessage = handleSocketMessage
                newWs.onerror = handleSocketError

                setWs(newWs);
            } catch (error) {
                console.error('WebSocket connection error:', error);
            }
        };

        initSocket();

        return () => {
            if (ws) {
                ws.close(); // Clean up on unmount
            }
        };

        // Cleanup function for the WebSocket instance
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws, isConnected, notifications }}>
            {children}
        </WebSocketContext.Provider>
    );
};