require("dotenv").config();

module.exports = {
  TOKEN:
    process.env.TOKEN || "", // Add your token in .env file or just add in String
  PREFIX: process.env.PREFIX || ",",
  Slash: {
    Global: true, // set false for loading slash command in your testing guild make sure you add your server id
    GuildID: process.env.GuildID || "987622739030446090", // Your testing Server ID
  },
};
