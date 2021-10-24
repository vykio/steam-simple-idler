var fs = require('fs'); 
var prompt = require('prompt-sync')();

const Bot = require('./bot');

const SteamUser = require('steam-user');
var client = new SteamUser();

let tempCode = '';


function connect()
{
    if (fs.existsSync('key')) {
        var key = fs.readFileSync('key', {encoding: 'utf-8'});
        client.logOn({
            "accountName": process.env.accountName,
            "loginKey": key
        })
    } else {
        tempCode = prompt("Code STEAM GUARD: ");
        client.logOn({
            "accountName": process.env.accountName,
            "password": process.env.password,
            "twoFactorCode":  tempCode,
            "rememberPassword": true
        })
    }
    
}

connect()

client.on('loggedOn', function(details) {
    console.log("[!] Logged into Steam as " + client.steamID.getSteam3RenderedID());

    console.log("[!] Status : Online");
    client.setPersona(SteamUser.EPersonaState.Online);

    var games = JSON.parse(fs.readFileSync('games.json', 'utf-8'));
    games.forEach(element => {
        console.log("[!] Playing: " + element.game_extra_info || element.game_id);
    });

    client.gamesPlayed(games)
})

client.on('loginKey', (key) => {
    console.log("[!] loginKey written to key file");
    fs.writeFileSync('key', key)
})
