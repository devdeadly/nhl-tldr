const google = require('google');

/**
  * Queries Google by player to extract their NHLID
  * @param player object
  * @returns Promise 
  */
 const addNhlIdToPlayer = ({player}) => {
  return new Promise((resolve) => {
    google(`${player.firstName} ${player.lastName} stats and news nhl`, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        if (resp) {
          player.playerId = resp.links[0].href.substr(-7);
        }
        resolve(player);
      }
    });
  });
};

module.exports = {
  addNhlIdToPlayer
};