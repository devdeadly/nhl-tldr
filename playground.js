const axios = require('axios');
const google = require('google');

const API_KEY = 'bf502ce7a9ca22442373e4e3d590895d';
const BASE_URL = 'http://api.eliteprospects.com/beta';

let hockeyObj = [];

axios({
  method: 'GET',
  url: 'http://api.eliteprospects.com/beta/search',
  params: {
    apikey: 'bf502ce7a9ca22442373e4e3d590895d',
    fields: 'id,name',
    filter: 'latestTeamStats.league.parentLeague.id=7',
    sort: 'id:asc'
  }
}).then(response => {
  teams = response.data.teams.data;
  teams.map(team => {
    let players = [];
    axios({
      method: 'GET',
      url: `${BASE_URL}/teams/${team.id}/playerstats`,
      params: {
        apikey: API_KEY,
        season: '2017-2018',
        fields: `player.firstName,player.lastName`
      }
    }).then(response => {
      let cleanedPlayers = [];

      players = response.data.data;
      players.map(player => {
        let cleanedPlayer = {};
        let imageUrl = ``;
        let { firstName, lastName } = player.player;
        setTimeout(() => {
          // google(`${firstName} ${lastName} stats and news nhl`, (err, resp) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     let playerID = '';
          //     if (resp) {
          //       const link = resp.links[0];
          //       playerID = link.href.substr(-7);
          //     }
          //     imageUrl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerID}@2x.jpg`;
          //     console.log(imageUrl);
          //     cleanedPlayer = {
          //       firstName,
          //       lastName,
          //       imageUrl
          //     }
          //     cleanedPlayers.push(cleanedPlayer);
          //   }
          // });
          console.log(firstName, lastName);
        }, 5000);
      })
      hockeyObj.push({
        id: team.id,
        name: team.name,
        cleanedPlayers
      });
    });
  });
});

console.log(hockeyObj);
// // GET LIST OF PLAYERS BY TEAM ID
// const teamID = req.params.teamID;
// axios({
//  method: 'GET',
//  url: `${BASE_URL}/teams/${teamID}/playerstats`,
//  params: {
//   apikey: API_KEY,
//   season: '2017-2018',
//   sort: 'TP:desc,G:desc,GP',
//   fields: `player.country.name,player.id,player.firstName,player.lastName,player.imageUrl,
//              player.caphit,player.contract,player.dateOfBirth,playerPositionteam.id,team.imageUrl,
//              GP,G,A,TP,PM,PIM,GGP,jerseyNumber`
//  }
// }).then(response => {
//  res.send(response.data);
// });

// // GET PLAYER IMAGE URL
// app.get('/api/image/:player', (req, res) => {
//  const player = req.params.player;
//  let imageUrl = ``;
//  console.log(player);
//  google(`${player} stats and news nhl`, (err, resp) => {
//   if (err) {
//    console.log(err)
//   } else {
//    let playerID = '';
//    if (resp) {
//     const link = resp.links[0];
//     playerID = link.href.substr(-7);
//    }
//    imageUrl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerID}@2x.jpg`;
//    res.send({ imageUrl });
//   }
//   res.send('there was an error');
//  });
// });

// // SEARCH FOR TEAM ID
// app.get('/api/search/:q', (req, res) => {
//  const q = req.params.q;

//  axios({
//   method: 'GET',
//   url: `${BASE_URL}/search`,
//   params: {
//    apikey: API_KEY,
//    q,
//    fields: 'id,name',
//    filter: 'latestTeamStats.league.parentLeague.id=7' // NHL ID = 7
//   }
//  }).then(response => {
//   try {
//    const data = response.data.teams.data[0];
//    res.send(data);
//   } catch (err) {
//    res.send({ err });
//   }
//  });
// });