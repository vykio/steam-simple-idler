# Steam Simple Idler

## Usage

Modify `games.json` to add games to idle in. Example: 

```json:games.json
[
    {
        "game_id": 440,
        "game_extra_info": "Team Fortress 3"
    }, {
        "game_id": 240,
        "game_extra_info": "Counter-Strike: Source"
    }, {
        "game_id": 252950,
        "game_extra_info": "Mocket League"
    }
]
```

Then you can launch the program by giving it two environment variables (your login and your password)

```sh
$ accountName=LOGIN password=PASSWORD node index.js
```

The first time, the program will ask for your current `STEAM GUARD` code. Then it will generate a key file containing the `loginKey`.
For future connections, the program will take the key file so you don't have to put the STEAM GUARD code again.

## Limitations

This program only works if STEAM GUARD is enabled, yet.

## Security

Storing the key file without encoding / decoding (using system informations) may lead to some security flaws as it can be stolen easily. 
