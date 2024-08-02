const { time } = require('console');
const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
  guildId: String,
  supportRoleId: String,
  categoryName: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('setup', setupSchema);
