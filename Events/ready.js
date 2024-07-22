const { ActivityType } = require("discord.js");
const client = require("../index");
const mongoose = require("mongoose");

client.on("ready", (c) => {
        console.log(`> ${c.user.tag} is online!`);

        mongoose.connect(process.env.MONGODB_URI,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
        })
        if(mongoose.connect){
                console.log("Connected to database")
        }
        else{
                console.log("Not connected to database")
        }

        client.user.setActivity({
                name: `Thanks for using our handler! start editing Events/ready.js`,
                type: ActivityType.Online,
        });
});
