import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

// ==========================================
// 1. SEND MESSAGE (& Maintain Chat History)
// ==========================================
export async function sendMessage(req, res) {
    const { message, chat: chatId } = req.body;

    // Validation Guard
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ 
            success: false, 
            message: "Message content is required." 
        });
    }

    // Auth Guard Check
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please log in."
        });
    }

    try {
        let title = null;
        let chat = null;

        // Step A: Handle New Chat Creation vs Existing Chat Validation
        if (!chatId) {
            try {
                title = await generateChatTitle(message);
            } catch (err) {
                console.error("Failed to generate chat title:", err);
                title = "New Chat"; // Fallback title if AI service rates out
            }

            chat = await chatModel.create({
                user: req.user.id,
                title
            });
        } else {
            // Verify existing chat belongs to current logged-in user
            chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat session not found or access denied."
                });
            }
            title = chat.title;
        }

        const activeChatId = chatId || chat._id;

        // Step B: Save User's incoming message
        const userMessage = await messageModel.create({
            chat: activeChatId,
            content: message,
            role: "user"
        });

        // Step C: Fetch full context history in chronological order
        const messages = await messageModel.find({ chat: activeChatId }).sort({ createdAt: 1 });

        // Step D: Send entire history context array to the AI service
        let result;
        try {
            result =  await generateResponse(messages);
        } catch (aiError) {
            console.error("AI Generation Error:", aiError);
            return res.status(429).json({
                success: false,
                message: "The AI service is currently busy or out of quota. Please try again shortly.",
                error: aiError.message
            });
        }

        // Step E: Save AI response message
        const aiMessage = await messageModel.create({
            chat: activeChatId,
            content: result,
            role: "ai"
        });

        return res.status(201).json({
            success: true,
            title,
            chat: chatId ? chat : chat, // Return target chat configuration metadata
            userMessage,
            aiMessage
        });

    } catch (error) {
        console.error("Error in sendMessage controller:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred while sending your message.",
            error: error.message
        });
    }
}

// ==========================================
// 2. GET ALL CHATS FOR LOGGED IN USER
// ==========================================
export async function getChats(req, res) {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        const chats = await chatModel.find({ user: req.user.id }).sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Chats retrieved successfully",
            chats
        });
    } catch (error) {
        console.error("Error in getChats controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve chats.",
            error: error.message
        });
    }
}

// ==========================================
// 3. GET MESSAGES FOR A SPECIFIC CHAT
// ==========================================
export async function getMessages(req, res) {
    const { chatId } = req.params;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        // Verify chat ownership first
        const chat = await chatModel.findOne({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found or access denied."
            });
        }

        // Retrieve conversation orderly
        const messages = await messageModel.find({ chat: chatId }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages
        });
    } catch (error) {
        console.error("Error in getMessages controller:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve messages.",
            error: error.message
        });
    }
}

// ==========================================
// 4. DELETE CHAT & DEPENDENT MESSAGES
// ==========================================
export async function deleteChat(req, res) {
    const { chatId } = req.params;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    try {
        // Find and delete the primary chat document targeting the correct owner
        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found or access denied."
            });
        }

        // Clean up linked conversational sub-history
        await messageModel.deleteMany({ chat: chatId });

        return res.status(200).json({
            success: true,
            message: "Chat and its history deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteChat controller:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while attempting to delete the chat.",
            error: error.message
        });
    }
}