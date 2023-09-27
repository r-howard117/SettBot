let fs = require("fs");
let queueString = fs.readFileSync("src/queues.json", "utf-8");
const queues = JSON.parse(queueString);

/**
 * Retrieves basic match stats from loaded match and replies with a formatted
 * message containing these stats in discord.
 */
module.exports =  {
    name: "match-stats",
    description: "Displays basic stats from loaded match.",
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],
    //deleted: true,

    callback: async (client, interaction) => {
        console.log(match);
        interaction.reply(formatMatch());
    }
}

/**
 * Uses the globally loaded match object and retrieves basic stats. Then formats
 * these stats into a string to be used as an interaction response.
 * @returns a formatted string containing match stats.
 */
let formatMatch = function(){
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
            outputString += `Champ: ${teams[team][player].championName}`.padEnd(20)
            + `K: ${teams[team][player].kills}`.padEnd(6)
            + `D: ${teams[team][player].deaths}`.padEnd(6)
            + `A: ${teams[team][player].assists}`.padEnd(6)
            outputString += "\n";
        }
    }
    return outputString + "`";
}