'use client'

import DefaultChatZone from "./components/DefaultChatZone"
import classes from './components/index.module.css'
export default function ChatPage() {

    return (
        <div className={classes.right}>
            <DefaultChatZone />
        </div>
    )
}
