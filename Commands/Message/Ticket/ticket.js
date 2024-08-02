const { Message, PermissionFlagsBits, Client } = require("discord.js");

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
                
        },
};
