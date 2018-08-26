const express = require('express');
const axios = require('axios');
const google = require('google');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 8000;

const API_KEY = 'bf502ce7a9ca22442373e4e3d590895d';
const BASE_URL = 'http://api.eliteprospects.com/beta';

const app = express();
 
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true
  });
  next();
});

// GET LIST OF NHL TEAMS
app.get('/api/teams', (req, res) => {
  axios({
    method: 'GET',
    url: 'http://api.eliteprospects.com/beta/search',
    params: {
      apikey: 'bf502ce7a9ca22442373e4e3d590895d',
      fields: 'id,name,imageUrl',
      filter: 'latestTeamStats.league.parentLeague.id=7',
      sort: 'id:asc'
    }
  }).then(response => {
    res.send(response.data);
  })
});

// GET PLAYER IMAGE URL
app.get('/api/image/:player', (req, res) => {
  const player = req.params.player;
  let imageUrl = ``;
  console.log(player);
  google(`${player} stats and news nhl`, (err, resp) => {
    if (err) {
      console.log(err)
    } else {
      let playerID = '';
      if (resp) {
        const link = resp.links[0];
        playerID = link.href.substr(-7);
      }
      imageUrl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerID}@2x.jpg`;
      res.send({ imageUrl });
    }
   res.send('there was an error');
  });
});

// SEARCH FOR TEAM ID
app.get('/api/search/:q', (req, res) => {
  const q = req.params.q;

  axios({
    method: 'GET',
    url: `${BASE_URL}/search`,
    params: {
      apikey: API_KEY,
      q,
      fields: 'id,name',
      filter: 'latestTeamStats.league.parentLeague.id=7' // NHL ID = 7
    }
  }).then(response => {
    try {
      const data = response.data.teams.data[0];
      res.send(data);
    } catch (err) {
      res.send({ err });
    }
  });
});

// GET LIST OF PLAYERS BY TEAM ID
app.get('/api/players/:teamId', (req, res) => {
  const teamId = req.params.teamId;
  axios({
    method: 'GET',
    url: `${BASE_URL}/teams/${teamId}/playerstats`,
    params: {
      apikey: API_KEY,
      season: '2017-2018',
      sort: 'TP:desc,G:desc,GP',
      fields: `player.country.name,player.id,player.firstName,player.lastName,player.imageUrl,
              player.caphit,player.contract,player.dateOfBirth,playerPositionteam.id,team.imageUrl,
              GP,G,A,TP,PM,PIM,GGP,jerseyNumber`
    }
  }).then(response => {
    const players = response.data.data;
    
    // getPlayersNhlId(players).then((data) => {
    //   console.log('test', data);
    // });

  });
});

const getPlayersNhlId = (players) => {
  return new Promise((resolve, reject) => {
    resolve(
      players.map((player, index) => {
        // setTimeout(() => {
          return player.firstName + " plays for the Avs";
        // }, index * 1000);
      })

      // players.map((player, index) => {
      //   setTimeout(() => {
      //     google(`${player.firstName} ${player.lastName} stats and news nhl`, (err, resp) => {
      //       if (err) {
      //        console.log(err)
      //       } else {
      //        let playerID = '';
      //        if (resp) {
      //         const link = resp.links[0];
      //         playerID = link.href.substr(-7);
      //        }
      //        imageUrl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerID}@2x.jpg`;
      //       }
      //      });
      //   }, index * 2000);
      // });

    );
  })
}

getPlayersNhlId(avsPlayers).then((data) => {
  console.log(data);
});


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});