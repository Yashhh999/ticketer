require("dotenv").config();

module.exports = {
  TOKEN:
    process.env.TOKEN || "MTE2Nzg0MzQyNTc0NDMzMDg0Mg.G9O91Q.fxJes-uLYrbdN9HHwiAfo8s-P7D6-TpVeJuYn0", // Add your token in .env file or just add in String
  PREFIX: process.env.PREFIX || ",",
  Slash: {
    Global: true, // set false for loading slash command in your testing guild make sure you add your server id
    GuildID: process.env.GuildID || "ID", // Your testing Server ID
  },
};
