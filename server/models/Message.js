const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userMessage: String,
  aiMessage: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
