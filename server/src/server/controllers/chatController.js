import Chat from '../models/Chat.model';
import Message from '../models/Message.model';
import { findFullInfoForRecipient } from './helperController';
import BadReqError from '../utils/errors/BadReqError';

module.exports.startChat = async (req, res, next) => {
  try {
    let { sender, recipient } = req.body;
    let conversation = await Chat.findOne({ participants: { $all: [sender, recipient] } }).lean();
    if (!conversation) {
      const chat = new Chat({ participants: [sender, recipient] });
      await chat.save();
      conversation = chat.toObject();
    }
    const allMessages = await Message.find({ chat_id: conversation._id });
    const unreadMessages = allMessages.filter(mess =>
      mess.status === false && mess.user_id !== req.id);
    conversation = await findFullInfoForRecipient([conversation], req.id);
    res.send({ conversation, allMessages, unreadMessages });
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.changeStatusMessages = async (req, res, next) => {
  try {
    const { unreadMessages } = req.body;
    const messagesIds = unreadMessages.map(item => item._id);
    await Message.update(
      { _id: { $in: messagesIds } },
      { status: true },
      {multi: true}
    );
    const allMessages = await Message.find({_id: { $in: messagesIds}});
    res.send(allMessages);
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.createMessage = async (req, res, next) => {
  try {
    const user_id = req.id;
    const { chat_id, content } = req.body;
    const messageModel = new Message({
      chat_id,
      user_id,
      content,
    });
    const message = await messageModel.save();
    res.send(message);
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.getAllChats = async (req, res, next) => {
  try {
    const myChats = await Chat.find({ participants: req.id }).distinct('_id');
    const chats = await Message.aggregate([
      { $match: { chat_id: { $in: myChats } } },
      {
        $lookup: {
          from: 'chats',
          localField: 'chat_id',
          foreignField: '_id',
          as: 'members',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects:
              [{ $arrayElemAt: ['$members', 0] },
                '$$ROOT'],
          },
        },
      },
      { $project: { members: 0 } },
      { $sort: { date: -1 } },
      {
        $group: {
          _id: '$chat_id',
          createdAt: { $last: '$createdAt' },
          content: { $last: '$content' },
          status: { $last: '$status' },
          unreadMessage: {$sum: {$cond: { if: {$eq: ['$status', false]}, then: 1, else: 0} }},
          user_id: { $last: '$user_id' },
          participants: { $last: '$participants' },
        },
      }]).sort({ createdAt: -1 });
    const allChatsForUser = await findFullInfoForRecipient(chats, req.id);
    res.send(allChatsForUser);
  } catch (err) {
    next(new BadReqError());
  }
};
