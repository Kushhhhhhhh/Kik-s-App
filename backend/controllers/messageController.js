import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({

            participants: {
                $all: [senderId, receiverId]
            },

       });

       if(!conversation){
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        });
       }

       const newMessage = new Message({
        senderId,
        receiverId,
        message
       });

       if(newMessage){
        conversation.messages.push(newMessage._id);
       }

       await Promise.all([conversation.save(), newMessage.save()]);

       const receiverSocketId = getRecieverSocketId(receiverId);

       if(receiverSocketId){
        io.to(receiverSocketId).emit('newMessage', newMessage);
       }

       res.status(200).json(newMessage);

    } catch (error) {

        console.log('Message Controller Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

export const getMessages = async (req, res) => {
    try {

       const { id: userToChatId } = req.params;
       const senderId = req.user._id;
       const conversation = await Conversation.findOne({
           participants: {
               $all: [senderId, userToChatId]
           }, 
       }).populate('messages'); 

       if(!conversation) return res.status(404).json([]);
       
       const messages = conversation.messages;
       
       res.status(200).json(conversation.messages);
        
    } catch (error) {

        console.log('Get Message Controller Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}