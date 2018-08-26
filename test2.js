const axios = require('axios');
    
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];

const addNameToUser = (user) => {
  var prom = axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}`)
    .then(({ data }) => ({
      ...user,
      name: data.name
    }));
  console.log('Promise 1', prom);
  return prom;
}

const requests = users.map((user, index) => {
  var prom =  new Promise((resolve) => { 
    setTimeout(() => {
      resolve(addNameToUser(user))
    }, index * 1000)
  });
  console.log('Promise 2', prom);
  return prom;
});

Promise.all(requests).then((updatedArr) => {
  console.log(JSON.stringify(updatedArr));
});