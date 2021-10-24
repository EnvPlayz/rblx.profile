let Discord = require("discord.js");
let axios = require("axios");
const rbx = require('noblox.js')
require("dotenv").config();
let client = new Discord.Client();

const prefix = process.env.PREFIX;

client.once("ready",() => {
    console.log("rblx.profile is online!");
    client.user.setStatus("Use"+prefix+" help")
    client.user.setActivity(prefix+" help. for help", {type: 'LISTENING'});
});

client.on("message", async function(message){
    if(message.content.startsWith(prefix) || message.author.bot){
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if(args[0]=== "profile" || args[0]=="prof"){
            axios.get(`https://api.roblox.com/users/get-by-username?username=${args[1]}`).then(function (data) {
                var id = JSON.stringify(JSON.parse(JSON.stringify(data.data)).Id);
                var username = JSON.stringify(JSON.parse(JSON.stringify(data.data)).Username);
                axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=true&size=48x48&userIds=${id}`).then(function (deta) {
                var avatar = JSON.stringify(JSON.parse(JSON.stringify(deta.data)).data[0].imageUrl);
                avatar = avatar.replace('"',"");
                avatar = avatar.replace('"',"");
                let embed = new Discord.MessageEmbed()
                .setTitle("Success!")
                .setImage(avatar)
                .setDescription(`Account ID: ${id}, Username: ${username}`)
                .setFooter(username)
                .setColor("GREEN")
                message.channel.send(embed)
            })
        }).catch(err => {
                let embed = new Discord.MessageEmbed()
                .setTitle("System down!")
                .setImage(avatar)
                .setDescription(`${message.author.tag} RUINED IT`)
                .setFooter("bot down! app must be restarted now!")
                .setColor("RED")
                message.channel.send(embed)
        })
        }
        if(args[0]=== "id"){
            axios.get(`https://users.roblox.com/v1/users/${args[1]}`).then(function (data) {
                var id = JSON.stringify(JSON.parse(JSON.stringify(data.data)).id);
                var username = JSON.stringify(JSON.parse(JSON.stringify(data.data)).name);
                var about = JSON.stringify(JSON.parse(JSON.stringify(data.data)).description);
                axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=true&size=48x48&userIds=${id}`).then(function (deta) {
                var avatar = JSON.stringify(JSON.parse(JSON.stringify(deta.data)).data[0].imageUrl);
                avatar = avatar.replace('"',"");
                avatar = avatar.replace('"',"");
                let embed = new Discord.MessageEmbed()
                .setTitle("Success!")
                .setImage(avatar)
                .setDescription(`Account ID: ${id}, Username: ${username}, About: ${about}`)
                .setFooter(username)
                .setColor("GREEN")
                message.channel.send(embed);
                if(JSON.parse(JSON.stringify(data.data)).includes("invaild id")){
                    let embedtxt = new Discord.MessageEmbed()
                    .setTitle("Error! "+err)
                    .setDescription(`BRUH. i searched the whole databse and found nothing.`)
                    .setColor("RED")
                    message.channel.send(embedtxt);
                }
            })
        }).catch(err => {
            let embed = new Discord.MessageEmbed()
                .setTitle("Error! "+err)
                .setDescription(`BRUH. i searched the whole databse and found nothing.`)
                .setColor("RED")
                message.channel.send(embed);
        });
        }
        if(args[0]=== "help"){
            let embed = new Discord.MessageEmbed()
            .setTitle("Commands for RobloxProfile Bot")
            .setDescription(`Prefix: ${prefix},
            Get profile using usernames: ${prefix} prof/profile [username],
            Get profile using ids: ${prefix} id [user id],
            Get a list of users from a keyword: ${prefix} search [keyword]
            Get help: ${prefix} help
            Get the link to a users profile using ids: ${prefix} getlinkid [id]
            Get the link to a users profile using username: ${prefix} getlinkusername [username]
            `)
            .setColor("RANDOM")
            message.channel.send(embed);
        }
        if(args[0]=== "search"){
            if(args[1].length < 4){
                let embed = new Discord.MessageEmbed()
                .setTitle("Error!")
                .setDescription(`
                Your keyword is only ${args[1].length}! a minimum of 4 characters are needed!`)
                .setFooter("All data feteched directly from the RobloxAPI")
                .setColor("RED")
                message.channel.send(embed);
                return true;
            }
            axios.get(`https://users.roblox.com/v1/users/search?keyword=${args[1]}&limit=10`).then(function(data){
                if(data.status==200){
                    var searchname1 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[0].name);
                    var searchid1 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[0].id);
                var searchname2 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[1].name);
                var searchid2 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[1].id);
                var searchname3 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[2].name);
                var searchid3 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[2].id);
                var searchname4 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[3].name);
                var searchid4 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[3].id);
                var searchname5 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[4].name);
                var searchid5 = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[4].id);
                axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=true&size=48x48&userIds=${searchid1}`).then(function (deta) {
                    var avatar = JSON.stringify(JSON.parse(JSON.stringify(data.data)).data[0].imageUrl);
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Search Results.")
                    .setImage(avatar)
                    .setDescription(`
                    Username: ${searchname1}, Id:${searchid1}
                    Username: ${searchname2}, Id:${searchid2}
                    Username: ${searchname3}, Id:${searchid3}
                    Username: ${searchname4}, Id:${searchid4}
                    Username: ${searchname5}, Id:${searchid5}
                    to select a username type !rblx profile [username] or use !rbx id [user id].`)
                    .setFooter("All data feteched directly from the RobloxAPI")
                    .setColor("GREEN")
                    message.channel.send(embed);
                });
            }
        });
    }//
    if(args[0]=="getlinkid"){
        axios.get(`https://users.roblox.com/v1/users/${args[1]}`).then(function (data) {
            axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=true&size=48x48&userIds=${args[1]}`).then(function (deta) {
            var username = JSON.stringify(JSON.parse(JSON.stringify(data.data)).name);
            var id = JSON.stringify(JSON.parse(JSON.stringify(data.data)).id);
            var avatar = JSON.stringify(JSON.parse(JSON.stringify(deta.data)).data[0].imageUrl);
            avatar = avatar.replace('"',"");
            avatar = avatar.replace('"',"");
            console.log(id,username,avatar)
            let embed = new Discord.MessageEmbed()
            .setTitle("Link to "+username)
            .setImage(avatar)
            .setDescription(`
            Link: https://www.roblox.com/users/${id}/profile
            `)
            .setFooter("All data feteched directly from the RobloxAPI")
            .setColor("GREEN")
            message.channel.send(embed);
        });
    });
}//
if(args[0]=="getlinkusername"){
    axios.get(`https://api.roblox.com/users/get-by-username?username=${args[1]}`).then(function (data) {
        var username = JSON.stringify(JSON.parse(JSON.stringify(data.data)).Username);
        var id = JSON.stringify(JSON.parse(JSON.stringify(data.data)).Id);
        axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?format=Png&isCircular=true&size=48x48&userIds=${id}`).then(function (deta) {
            var avatar = JSON.stringify(JSON.parse(JSON.stringify(deta.data)).data[0].imageUrl);
            avatar = avatar.replace('"',"");
            avatar = avatar.replace('"',"");
            console.log(id,username,avatar)
            let embed = new Discord.MessageEmbed()
                    .setTitle("Link to "+username)
                    .setImage(avatar)
                    .setDescription(`
                    Link: https://www.roblox.com/users/${id}/profile
                    `)
                    .setFooter("All data feteched directly from the RobloxAPI")
                    .setColor("GREEN")
                    message.channel.send(embed);
            });
        });
    }//
    if(args[0]=="addfriend"){
       var username=await rbx.getUsernameFromId(1);
       console.log(username);
    }// 
}   ///////////////////////////////Prefix found end
}); /////////////////////////Message Handler End

client.login(process.env.DISCORD_TOKEN);