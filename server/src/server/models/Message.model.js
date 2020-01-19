import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true } },
  { versionKey: false },
);

module.exports = mongoose.model('Message', MessageSchema);
