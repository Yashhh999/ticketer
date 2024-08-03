const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const ServerConfig=require('../../../Models/Setup')
module.exports = {
        name: "setup",
        description: "Websocket of bot",
        userPermissions: PermissionFlagsBits.SendMessages,
        botPermissions: PermissionFlagsBits.SendMessages,
        category: "Utility",
        cooldown: 5,
        /**
         *
         * @param {Client} client
         * @param {Message} message
         * @param {String[]} args
         * @param {String} prefix
         */
        run: async (client, message, args, prefix) => {
               
                //Category ID
                //server id
                //Support role id
                


                  

        },
};
