import { initializeSocketConnection } from "../service/chat.socket";
import {
    getChats,
    getMessages,
    sendMessage,
    deleteChat,
    
} from "../service/chat.api";
import {
    setChats,
    setCurrentChatId,
    setError,
    setLoading,
    createNewChat,
    addNewMessage
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async ({ message, chatId }) => {
        dispatch(setLoading(true));
        const data = await sendMessage({ message, chatId });
        const { chat, aiMessage } = data;
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: "user",
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
        }))
        dispatch(setCurrentChatId(chat._id));
    };

    return {
    initializeSocketConnection,
    handleSendMessage
};
};
