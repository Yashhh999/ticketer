const { Message, PermissionFlagsBits, Client } = require("discord.js");

module.exports = {
        name: "ping",
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

                // NOTE: Please read the article of discord before using message commands! 
                // Recommended: Use Slash command only
                // Link: https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ 

                // Code
                message.reply({
                        content: `Pong: \`${client.ws.ping}\``,
                });
        },
};
