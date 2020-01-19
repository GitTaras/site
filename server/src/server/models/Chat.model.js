import mongoose from 'mongoose';

const ChatSchema = mongoose.Schema({
  participants: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: { createdAt: true } },
{ versionKey: false },
);

module.exports = mongoose.model('Chat', ChatSchema);
