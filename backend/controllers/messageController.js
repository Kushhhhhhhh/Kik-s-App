import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

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
        })
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

       res.status(200).json(newMessage);

    } catch (error) {

        console.log('Message Controller Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}