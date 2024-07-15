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
    isConnected: boolean;
    notifications: any;
    sound: any
}

export const WebSocketContext = createContext<WebSocketContextValue>({
    ws: null,
    isConnected: false,
    notifications: [],
    sound: true
});

export const WebSocketNotiProvider = ({ children }: { children: React.ReactNode }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [conversationWs, setConversationWs] = useState<WebSocket | null>(null)
    const [conversationWsIsConnected, setConversationWsIsConnected] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>()
    const { data: session } = useSession()
    const [sound, setSound] = useState<boolean>(false)
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
        console.log('vào notification message');
        const data = JSON.parse(event.data) as any
        console.log('provider: ', data);
        if (data.msg_type === 'ERROR' && session?.access_token) {
            console.log('vao error');
            signOut()
        } else {
            setNotifications((prev: INotifcation[]) => [
                {
                    url: data.data.redirect_url,
                    title: data.title,
                    content: data.body
                },
                ...prev])
            toast.custom((t) => (
                <div
                    style={{ width: '350px' }}
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {data.title}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {data.body}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), {
                position: "bottom-left"
            })
        }

    };
    // on error notification socket
    const handleSocketError = (error: Event) => {
        console.error('WebSocket error:', error)
    };

    // on message conversation socket
    const handleConversationSocketMessage = (message: MessageEvent) => {
        console.log('vào conversation message');

        const data = JSON.parse(message.data) as any

        if (data.msg_type === 'ERROR' && session?.access_token) {
            console.log('vao error');
            signOut()
        } else {
            setNotifications((prev: INotifcation[]) => [
                {
                    url: `/chat/${data.conversation_id}`,
                    title: 'Bạn có tin nhắn mới',
                },
                ...prev])
            setSound(prev => !prev)
            toast.custom((t) => (
                <div
                    style={{ width: '350px' }}
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Bạn có tin nhắn mới
                                </p>
                                {/* <p className="mt-1 text-sm text-gray-500">
                                    
                                </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ), {
                position: "bottom-left"
            })
        }
    }
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

                chatCoversationWs.onmessage = handleConversationSocketMessage
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
        <WebSocketContext.Provider value={{ ws, isConnected, notifications, sound }}>
            {children}
        </WebSocketContext.Provider>
    );
};