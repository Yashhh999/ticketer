const {
        CommandInteraction,
        ApplicationCommandType,
        PermissionFlagsBits,
        ApplicationCommandOptionType,
        Client,
        User,
} = require("discord.js");

module.exports = {
        name: "hello",
        description: `Say hello to bot`,
        userPermissions: PermissionFlagsBits.SendMessages,
        botPermissions: PermissionFlagsBits.SendMessages,
        category: "Utility",
        options: [
                {
                        name: "prompt",
                        description: "Say Something.",
                        type: ApplicationCommandOptionType.String,
                        required: true
                },
                {
                        name: "autocomplete",
                        description: "Example of autocomplete",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        autocomplete: true
                }
        ],
        type: ApplicationCommandType.ChatInput,

        async autocomplete(interaction) {
                const focusedOption = interaction.options.getFocused(true);

                let choices;

                if (focusedOption.name === "autocomplete") {
                        choices = ["Thanks", "For", "Using", "My", "Handler"]
                }

                const filtered = choices.filter((choice) =>
                        choice.startsWith(focusedOption.value)
                );
                await interaction.respond(
                        filtered.map((choice) => ({ name: choice, value: choice }))
                );
        },

        run: async (client, interaction) => {
                // Guide: https://discordjs.guide/slash-commands/response-methods.html#command-response-methods
                // 👇 Use this code for .followUp method, only then you will able to use FollowUps messages

                await interaction
                        .deferReply({ ephemeral: false, fetchReply: true })
                        .catch(() => { });

                let UserPrompt = interaction.options.getString("prompt")
                let Autocomplete = interaction.options.getString("autocomplete")

                interaction.followUp({
                        content: `You Said: ${UserPrompt}\nReply: Hello!`,

                });

                console.log("Autocomplete Output: ", Autocomplete)

        },
};
