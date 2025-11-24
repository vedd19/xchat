import { useContext, useEffect, useRef, useState } from "react";
import { getOrCreateRoom, listenMessages, listenTyping, sendMessage, setTyping } from "../firebase/chatService";
import { UserDataContext } from "../../context/UserDataContext";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SendIcon from '@mui/icons-material/Send';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';


export const ActiveChat = () => {
    const { userChat } = useContext(UserDataContext);

    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
    const typingTimeoutRef = useRef(null);



    useEffect(() => {
        async function init() {
            if (!userChat?._id) return;

            const rid = await getOrCreateRoom(localStorage.getItem('id'), userChat._id);
            setRoomId(rid);

            listenMessages(rid, (msgs) => {
                setMessages(msgs);
            });
        }

        init();
    }, [userChat]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        await sendMessage(roomId, localStorage.getItem('id'), message);
        setTyping(roomId, localStorage.getItem('id'), false);
        setMessage("");
    };

    const handleMessageInputChange = (e) => {
        const value = e.target.value;
        setMessage(value);

        setTyping(roomId, localStorage.getItem('id'), true);

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            setTyping(roomId, localStorage.getItem('id'), false);
        }, 1000);
    }


    useEffect(() => {
        if (!roomId) return;
        const unsubscribe = listenTyping(roomId, localStorage.getItem('id'), (isTyping) => {
            setIsOtherUserTyping(isTyping);
        });

        return () => unsubscribe(); // stop listening when unmounted
    }, [roomId]);

    return (
        <div className='w-full h-full flex flex-col' id='chat-layout'>

            <div className="bg-white flex justify-between p-3 shadow-md w-full">
                <div className="flex gap-3 items-center h-[2rem]">
                    <img height='h-full' src={userChat.avatar} alt="dp" className="h-[2rem] w-[2rem] rounded-full" />
                    <div>
                        <p>{userChat.fullName}</p>
                        <p className='text-gray-500 text-sm'>Last seen 5 min ago</p>
                    </div>
                </div>
                <MoreVertOutlinedIcon />
            </div>


            <div className="flex-1 p-4 overflow-y-auto space-y-3" id="chat-window">
                {messages.map((msg, i) => (
                    <div key={i} className={`w-full flex ${msg.senderId === localStorage.getItem('id') ? "justify-end" : "justify-start"}`}>
                        <div className={`p-2 max-w-xs rounded-lg ${msg.senderId === localStorage.getItem('id')
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                            }`} data-cy="chat-message">
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isOtherUserTyping && (
                    <div className="w-full flex justify-start">
                        <div className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm animate-pulse">
                            typing...
                        </div>
                    </div>
                )}
            </div>


            <div>
                <TextField
                    id="message-input"
                    sx={{ paddingRight: '0px' }}
                    fullWidth
                    value={message}
                    onChange={handleMessageInputChange}
                    slotProps={{
                        input: {
                            startAdornment: (<InputAdornment position='start'>
                                <SentimentSatisfiedOutlinedIcon />
                            </InputAdornment>),
                            endAdornment: (<InputAdornment position='end'>
                                <div id="send-button" onClick={handleSendMessage} className="bg-blue-300 p-2 rounded cursor-pointer">
                                    <SendIcon sx={{ color: 'white' }} />
                                </div>
                            </InputAdornment>)
                        }
                    }}
                    placeholder='Type your message...'
                />
            </div>
        </div>
    );
}
