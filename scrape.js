const axios = require('axios');
const google = require('google');
const { PlayersAPI } = require('./playersApi');

let avsPlayers = [];

 /**
  * Queries Google by player to extract their NHLID
  * @param player object
  * @returns Promise 
  */
 const addNhlIdToPlayer = (player) => {
  return new Promise((resolve) => {
    google(`${player.firstName} ${player.lastName} stats and news nhl`, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        let playerId = '';
        if (resp) {
        const link = resp.links[0];
        player.playerId = link.href.substr(-7);
        }
        resolve(player);
      }
      });
  });
}

const updatePlayersWithId = PlayersAPI.players.map((player, index) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(addNhlIdToPlayer(player));
    }, index * 1000);
  })
});

Promise.all(updatePlayersWithId).then((players) =>{
  avsPlayers = players;
  console.log(avsPlayers);
})


