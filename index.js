const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client(); 
require("dotenv/config");
const http = require("http");
const port = process.env.PORT || 3000;
//server
http.createServer().listen(port);

const token = process.env.TOKEN;

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is up`);
    bot.user.setActivity("Slaying tincans")
});
//BEE
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1); 

    if(cmd === `${prefix}bee`){
        return message.channel.send(":bee: :bee: :bee: :bee: :bee: :bee: :bee: :bee: :bee: :bee: :bee:"); 
    }
//serverinfo 
    if(cmd === `${prefix}serverinfo`){
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Info")
        .setColor("d18a2e")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("Joined at", message.member.joinedAt)
        .addField("Total members", message.guild.memberCount)
        return message.channel.send(serverembed); 
    }
//warning 
    if(cmd === `${prefix}warning`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Could not find user"); 
        let reason = args.join(" ").slice(22); 
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("*stares at you in confusion*");
        
        let warningembed = new Discord.RichEmbed()
        .setDescription("Warning")
        .setColor("d18a2e")
        .addField("Reported User",`${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);
        
        let reportchannel = message.guild.channels.find(`name`, "log");
        if(!reportchannel) return message.channel.send("No log channel found");
        
        message.delete().catch(O_o=>{});
        reportchannel.send(warningembed); 
        
        return; 
    }
    //kick
    if(cmd === `${prefix}kick`){
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Could not find user"); 
        let kreason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("*stares at you in confusion*");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person cannot be kicked");

        let kickembed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("d18a2e")
        .addField("Kicked User",`${kUser} with ID: ${kUser.id}`)
        .addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kreason);

        let kickchannel = message.guild.channels.find(`name`, "log");
        if(!kickchannel) return message.channel.send("No log channel found");
        
        message.channel.send(`${kUser} has been kicked`); 
        message.guild.member(kUser).kick(kreason);
        kickchannel.send(kickembed);  
        return;
    }
    //ban
    if(cmd === `${prefix}ban`){
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Could not find user"); 
        let breason = args.join(" ").slice(22);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("*stares at you in confusion*");
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person cannot be kicked");

        let banembed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("700702")
        .addField("Banned User",`${bUser} with ID: ${bUser.id}`)
        .addField("Banned By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", breason);

        let banchannel = message.guild.channels.find(`name`, "log");
        if(!banchannel) return message.channel.send("No log channel found");

        message.channel.send(`${bUser} has been banned`);
        message.guild.member(bUser).ban(breason);
        banchannel.send(banembed); 
    }
}); 

//welcome code

bot.on("guildMemberAdd", member =>{
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;
    
    channel.send(`Welcome to the server ${member}, make sure to read the rules and channel information page!`)
}); 

//FH art 

bot.on("message", async message =>{
    if(message.channel.id == "552220417671036928"){
        var attachments = (message.attachments).array();

        if(attachments.length === 0){
            message.delete().catch(err => console.log(err));
            message.author.send("only post images in this channel!").catch(err => console.log);
        }
//repost bit
        if (attachments[0] !== undefined) {
                    //we send the message in another channel
                    const embed = new Discord.RichEmbed()
                        .setTitle("New Art!")
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor("d18a2e")
                        .setDescription(message.content)
                        .setImage(attachments[0].url)
                        .setTimestamp()
                        .addField("Original post from", "<#" + message.channel.id + ">", true)

                    bot.channels.get("552614615150886924").send({ embed }).catch(err => console.log(err));
        }

    }
});

//other art

bot.on("message", async message =>{
    if(message.channel.id == "552220456258764810"){
        var attachments = (message.attachments).array();

        if(attachments.length === 0){
            message.delete().catch(err => console.log(err));
            message.author.send("only post images in this channel!").catch(err => console.log);
        }
//repost bit
        if (attachments[0] !== undefined) {
                    //we send the message in another channel
                    const embed = new Discord.RichEmbed()
                        .setTitle("New Art!")
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor("d18a2e")
                        .setDescription(message.content)
                        .setImage(attachments[0].url)
                        .setTimestamp()
                        .addField("Original post from", "<#" + message.channel.id + ">", true)

                    bot.channels.get("552614615150886924").send({ embed }).catch(err => console.log(err));
        }

    }
});

//cosplay display

bot.on("message", async message =>{
    if(message.channel.id == "552606454499115043"){
        var attachments = (message.attachments).array();

        if(attachments.length === 0){
            message.delete().catch(err => console.log(err));
            message.author.send("only post images in this channel!").catch(err => console.log);
        }
//repost bit
        if (attachments[0] !== undefined) {
                    //we send the message in another channel
                    const embed = new Discord.RichEmbed()
                        .setTitle("New Art!")
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor("d18a2e")
                        .setDescription(message.content)
                        .setImage(attachments[0].url)
                        .setTimestamp()
                        .addField("Original post from", "<#" + message.channel.id + ">", true)

                    bot.channels.get("552614615150886924").send({ embed }).catch(err => console.log(err));
        }

    }
});
//error log
bot.on("error", err =>{
    console.log(err);
}); 

bot.login(token); 