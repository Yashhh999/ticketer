const Ticket = require('../../../Models/Ticket');
const ServerConfig = require('../../../Models/Setup');
const { EmbedBuilder } = require('discord.js');
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
    const config = await ServerConfig.findOne({ guildId: message.guild.id });

    if (!config) {
      return message.reply('The bot is not configured properly. Please ask an admin to run the setup command.');
    }

    const ticket = await Ticket.create({
      guildId: message.guild.id,
      userId: message.author.id,
      ticketId: `TICKET-${Date.now()}`
    });

    const embed = new MessageEmbed()
      .setTitle('New Ticket')
      .setDescription(`Ticket ID: ${ticket.ticketId}`)
      .setTimestamp();

    const ticketChannel = await message.guild.channels.create(`ticket-${ticket.ticketId}`, {
      type: 'text',
      parent: config.ticketChannelId,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL']
        },
        {
          id: message.author.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        },
        {
          id: config.adminRoleId,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }
      ]
    });

    ticketChannel.send({ embeds: [embed] });
    message.reply('Your ticket has been created.');
  },
};
