const { ActivityType } = require("discord.js");
const client = require("../index");

client.on("ready", (c) => {
        console.log(`> ${c.user.tag} is online!`);

        client.user.setActivity({
                name: `Thanks for using our handler! start editing Events/ready.js`,
                type: ActivityType.Online,
        });
});
