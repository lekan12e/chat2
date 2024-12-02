import Conversation from "../models/conversations.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.mode.js";

const send = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: ID } = req.user;
    const { message } = req.body;

    const user1 = await User.findOne({ _id: id });
    const user2 = await User.findOne({ _id: ID });

    const receiverId = user1._id;
    const senderId = user2._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([await conversation.save(), await newMessage.save()]);

    res.status(201).send(newMessage);
  } catch (error) {
    console.error("Error in send controller:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatWithId } = req.params;
    const senderId = req.user.id;
    const messages = await Conversation.findOne({
      participants: { $all: [senderId, userToChatWithId] },
    }).populate("messages");
    if (!messages) return res.status(200).send({ message: [] });
    res.status(200).send({ message: messages.messages });
  } catch (error) {
    console.error("Error in get messages controller:", error.message);
  }
};

export { send, getMessages };
