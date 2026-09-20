const Conversations = require("../models/conversations.model.js")
const Messages = require("../models/messages.model.js")

const getAllBuyerConversations = async (req, res) => {
    try {
        const conversations = await Conversations.find({ buyer_id: req.token.user_id }).populate("sellerDetails", "company_name")
        res.json(conversations)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getAllSellerConversations = async (req, res) => {
    try {
        const conversations = await Conversations.find({ seller_id: req.token.user_id }).populate("buyerDetails", "company_name")
        res.json(conversations)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const getMessages = async (req, res) => {
    try {
        const messages = await Messages.find({ conversation_id: req.params.conversationId })
        res.json(messages)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const startChat = async (req, res) => {
    try {
        const conversationExists = await Conversations.findOne({
            buyer_id: req.body.buyer_id,
            seller_id: req.body.seller_id
        })

        if (!conversationExists) {
            const createdConversation = await Conversations.create({
                buyer_id: req.body.buyer_id,
                seller_id: req.body.seller_id,
                create_at: new Date().toISOString()
            })
            res.json({ conversation_id: createdConversation._id })
        } else {
            res.json({ conversation_id: conversationExists._id })
        }
    } catch (err) {
        res.json({ message: err.message })
    }
}

const sendMessage = async (req, res) => {
    try {
        const message = await Messages.create({
            conversation_id: req.params.conversationId,
            sender_id: req.token.user_id,
            message: req.body.message,
            create_at: new Date().toISOString()
        })

        const conversation = await Conversations.findByIdAndUpdate(req.params.conversationId, {
            last_message: req.body.message
        }, { new: true });

        if (conversation) {
            const recipient_id = conversation.buyer_id.toString() === req.token.user_id
                ? conversation.seller_id.toString()
                : conversation.buyer_id.toString();

            const io = req.app.get('io');
            const userSockets = req.app.get('userSockets');

            if (io && userSockets && userSockets.has(recipient_id)) {
                const socket_id = userSockets.get(recipient_id);
                io.to(socket_id).emit('receive_message', message);
            }
        }

        res.json(message)
    } catch (err) {
        res.json({ message: err.message })
    }
}

const checkOnlineStatus = async (req, res) => {
    try {
        const userSockets = req.app.get('userSockets');
        const isOnline = userSockets && userSockets.has(req.params.userId);
        res.json({ isOnline });
    } catch (err) {
        res.json({ message: err.message });
    }
}

module.exports = {
    getAllBuyerConversations,
    getAllSellerConversations,
    getMessages,
    startChat,
    sendMessage,
    checkOnlineStatus
}
