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
        try {
            const response = await axiosAuth.get('/admin/notifications?offset=0&limit=100')
            setNotifications(response.data.data)
        } catch (error) {
            console.log(error);

        }
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
        let timerNewWs: any
        let timerConversationWs: any
        const initSocket = async () => {
            try {
                const newWs = new WebSocket('wss://minhhungcar.xyz/admin/subscribe_notification')
                const chatCoversationWs = new WebSocket('wss://minhhungcar.xyz/admin/subscribe_conversation')
                //notification socket
                newWs.onopen = () => {
                    setIsConnected(true)
                    newWs.send(JSON.stringify({ access_token: `Bearer ${session?.access_token}` }))
                    timerNewWs = setInterval(() => {
                        newWs.send('')
                    }, 7000)
                }


                // conversation socket
                chatCoversationWs.onopen = () => {
                    setConversationWsIsConnected(true)
                    chatCoversationWs.send(JSON.stringify({ access_token: `Bearer ${session?.access_token}` }))
                    timerConversationWs = setInterval(() => {
                        chatCoversationWs.send('')
                    }, 10000)
                }

                // chatCoversationWs.onmessage = handleConversationSocketMessage
                // chatCoversationWs.onerror = handleConversationSocketError

                setConversationWs(chatCoversationWs)
                setWs(newWs);
            } catch (error) {
                console.error('WebSocket connection error:', error);
                if (timerNewWs) {
                    console.log(timerNewWs);
                    clearInterval(timerNewWs)
                }
                if (timerConversationWs) {
                    clearInterval(timerConversationWs)
                }
            }
        };

        initSocket();

        return () => {

            if (ws) {
                clearInterval(timerNewWs)
                ws.close(); // Clean up on unmount

            }
            if (conversationWs) {
                clearInterval(timerConversationWs)
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