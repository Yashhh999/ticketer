const { InteractionType, PermissionsBitField, Events } = require("discord.js");
const client = require("../index");

client.on(Events.InteractionCreate, interaction => {
        if (!interaction.isModalSubmit()) return;

        const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
        const hobbies = interaction.fields.getTextInputValue('hobbiesInput');

        console.log({ favoriteColor, hobbies });

        interaction.reply({
                content: "Your data has been logged in terminal go checkout!\n\nAlso Check `Events/modalCreate.js`"
        })
});