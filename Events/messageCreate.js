const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const client = require("../index");
const { PREFIX } = require("../Config/bot");

client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild || !message.id) return;

        let prefix = PREFIX;
        let mentionprefix = new RegExp(
                `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
        );
        if (!mentionprefix.test(message.content)) return;
        const [, nprefix] = message.content.match(mentionprefix);
        const args = message.content.slice(nprefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command =
                client.mcommands.get(cmd) ||
                client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
        if (!command) return;
        if (command) {
                if (
                        command.userPermissions &&
                        !message.member.permissions.has(
                                PermissionsBitField.resolve(command.userPermissions)
                        )
                ) {
                        return client.sendEmbed(message, `You don't have enough Permissions`);
                } else if (
                        command.botPermissions &&
                        !message.guild.members.me.permissions.has(
                                PermissionsBitField.resolve(command.botPermissions)
                        )
                ) {
                        return client.sendEmbed(message, `I don't have enough Permissions`);
                } else {
                        command.run(client, message, args, prefix);
                }
        }
});

function escapeRegex(newprefix) {
        return newprefix.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}