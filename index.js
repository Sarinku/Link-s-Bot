const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

client.on('guildMemberAdd', async member => {
    const channelBienvenue = member.guild.channels.find(`name`, "『🛸』𝐀𝐫𝐫𝐢𝐯𝐞́𝐞𝐬");
        if(!channelBienvenue) return;
        channelBienvenue.send(`🤙🏼 Hey ${member}, bienvenue sur le serveur de Sir Link l'ami ! Je t'invite à lire le règlement au plus vite. Allez ! Have Fun :)`);
});

client.login('Ptdr tu croyais pouvoir voler mon Token');
