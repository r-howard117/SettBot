const { StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ComponentType,
    SlashCommandBuilder,
    ChatInputCommandInteraction,} = require('discord.js');


let fs = require("fs");
let queueString = fs.readFileSync("src/queues.json", "utf-8");
const queues = JSON.parse(queueString);

/**
 * An array containing all selectable string options for specific match stats.
 * The value property is the name of the field within the Riot API.
 */
const stats = [
    {
        label: "Damage dealt",
        description: "Total damage dealt to champions.",
        value: "totalDamageDealtToChampions",
    },
    {
        label: "Damage received",
        description: "Total damage taken.",
        value: "totalDamageTaken",
    },
    {
        label: "Gold earned",
        description: "Total gold earned.",
        value: "goldEarned",
    },
    {
        label: "Damage dealt to towers",
        description: "Total damage dealt to turrets",
        value: "damageDealtToTurrets",
    },
];

/**
 * Uses the globally loaded match object and chosen stats. Then formats
 * these stats into a string to be used as an interaction response.
 * @param {Array} chosenStats the options chosen in the StringSelectMenu
 * @returns a formatted string containing match data
 */
let formatMatch = function(chosenStats){
    let players = match.info.participants;
    let teams = [[], []];
    let roles = ["Top", "Jng", "Mid", "Sup", "Bot"];
    for(player of players){
        if(player.teamId === 100){
            switch (player.teamPosition){
                case "TOP":
                    teams[0][0] = player;
                    break;
                case "JUNGLE":
                    teams[0][1] = player;
                    break;
                case "MIDDLE":
                    teams[0][2] = player;
                    break;
                case "UTILITY":
                    teams[0][3] = player;
                    break;
                case "BOTTOM":
                    teams[0][4] = player;
            }
        }
        else if(player.teamId === 200){
            switch (player.teamPosition){
                case "TOP":
                    teams[1][0] = player;
                    break;
                case "JUNGLE":
                    teams[1][1] = player;
                    break;
                case "MIDDLE":
                    teams[1][2] = player;
                    break;
                case "UTILITY":
                    teams[1][3] = player;
                    break;
                case "BOTTOM":
                    teams[1][4] = player;
            }
        }
    }
    let outputString = "`";

    for(queue in queues){
        if(match.info.queueId === queues[queue].queueId){
            outputString += `${queues[queue].map}: ${queues[queue].description.slice(0, -5)}`;
        }
    }

    if(match.info.teams[0].win){
        outputString += "\nTeam 1 Victory\n";
    }
    else{
        outputString += "\nTeam 2 Victory\n";
    }
    for(team in teams){
        outputString += `\nTEAM ${team*1 + 1}:\n`
        for(player in teams[team]){
            outputString += `${roles[player]}: ${teams[team][player].summonerName.padEnd(17)}`;
            outputString += `Champ: ${teams[team][player].championName}`.padEnd(20);
            for(stat of stats){
                if(chosenStats.includes(stat.value)){
                    outputString += `${stat.label}: ${teams[team][player][stat.value]}`.padEnd(30);
                }
            }
            outputString += "\n";
        }
    }
    return outputString + "`";
}
module.exports = {
    name: "stat-options",
    description: "Displays chosen stats of loaded match",
    callback: async (client, interaction) =>{
        const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder("Choose your stats.")
        .setMinValues(1)
        .setMaxValues(stats.length)
        .addOptions(stats.map((stat) => new StringSelectMenuOptionBuilder()
            .setLabel(stat.label)
            .setDescription(stat.description)
            .setValue(stat.value)
            )
        );
        const actionRow = new ActionRowBuilder().addComponents(selectMenu);
        
        const reply = await interaction.reply({ components: [actionRow] });
            
        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 30_000,
        });

        collector.on('collect', (interaction) => {
            interaction.reply(formatMatch(interaction.values));
        })
    }
};