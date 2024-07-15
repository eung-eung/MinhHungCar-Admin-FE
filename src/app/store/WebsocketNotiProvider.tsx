'use client'
import { signOut, useSession } from "next-auth/react";
import { createContext, useEffect, useRef, useState } from "react";
import useAxiosAuth from "../utils/hooks/useAxiosAuth";
import ToastNotification from "../layouts/components/ToastNotification";
import toast from "react-hot-toast";
import { INotifcation } from "../models/Notification";
import { useRouter } from "next/navigation";

interface WebSocketContextValue {
    ws: WebSocket | null;
    conversationWs: WebSocket | null;
    isConnected: boolean;
    notifications: any;
    sound: any,
    setNotifications: any
}

export const WebSocketContext = createContext<WebSocketContextValue>({
    ws: null,
    isConnected: false,
    notifications: [],
    sound: true,
    conversationWs: null,
    setNotifications: () => { }
});

export const WebSocketNotiProvider = ({ children }: { children: React.ReactNode }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [conversationWs, setConversationWs] = useState<WebSocket | null>(null)
    const [conversationWsIsConnected, setConversationWsIsConnected] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>()
    const { data: session } = useSession()
    const [sound, setSound] = useState<any>()
    const axiosAuth = useAxiosAuth()

    useEffect(() => {
        getNotificationList()
    }, [])

    // get notification list with api
    const getNotificationList = async () => {
        const response = await axiosAuth.get('/admin/notifications?offset=0&limit=100')
        setNotifications(response.data.data)
    }
    // onmessage with notification socket
    const handleSocketMessage = (event: MessageEvent) => {


    };
    // on error notification socket
    const handleSocketError = (error: Event) => {
        console.error('WebSocket error:', error)
    };

    // on message conversation socket
    // const handleConversationSocketMessage = (message: MessageEvent) => {
    //     console.log('vào conversation message');


    // }
    const handleConversationSocketError = () => {

    }
    useEffect(() => {
        const initSocket = async () => {
            try {
                const newWs = new WebSocket('wss://minhhungcar.xyz/admin/subscribe_notification')
                const chatCoversationWs = new WebSocket('wss://minhhungcar.xyz/admin/subscribe_conversation')
                //notification socket
                newWs.onopen = () => {
                    setIsConnected(true)
                    newWs.send(JSON.stringify({ access_token: `Bearer ${session?.access_token}` }))
                }
                newWs.onmessage = handleSocketMessage
                newWs.onerror = handleSocketError

                // conversation socket
                chatCoversationWs.onopen = () => {
                    setConversationWsIsConnected(true)
                    chatCoversationWs.send(JSON.stringify({ access_token: `Bearer ${session?.access_token}` }))
                }

                // chatCoversationWs.onmessage = handleConversationSocketMessage
                chatCoversationWs.onerror = handleConversationSocketError

                setConversationWs(chatCoversationWs)
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
            if (conversationWs) {
                conversationWs.close()
            }
        };

        // Cleanup function for the WebSocket instance
    }, []);

    return (
        <WebSocketContext.Provider value={
            { setNotifications, ws, isConnected, notifications, sound, conversationWs }}>
            {children}
        </WebSocketContext.Provider>
    );
};