const {
        ApplicationCommandOptionType,
        PermissionFlagsBits,
        Collection,
        EmbedBuilder,
        InteractionType,
        ActionRowBuilder,
        ButtonStyle,
        ButtonBuilder,
        Events,
} = require("discord.js");
const client = require("..");

client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.isAutocomplete()) {
                const command = client.scommands.get(interaction.commandName);


                if (!command) {
                        console.error(
                                `No command matching ${interaction.commandName} was found.`
                        );
                        return;
                }

                try {
                        await command.autocomplete(interaction);
                } catch (error) {
                        console.error(error);
                }
        }
});
