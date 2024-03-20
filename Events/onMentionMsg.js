const { Collection, EmbedBuilder } = require("discord.js");
const client = require("../index");

client.on("messageCreate", async (msg) => {

        // NOTE: Please read the article of discord before using message intents! 
        // Recommended: Dont use this
        // Read: https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ 

        if (msg.author.bot || !msg.guild) return;

        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (msg.content.match(prefixMention)) {
                msg.reply({
                        embeds: [
                                new EmbedBuilder()
                                        .setDescription(
                                                `Hello ${msg.author.username}, how i can help you?`
                                        ),
                        ],
                });
        }
});
