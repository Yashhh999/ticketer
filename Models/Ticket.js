const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  guildId: String,
  userId: String,
  channelId: String,
  categoryId: String,
  status: { type: String, default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
