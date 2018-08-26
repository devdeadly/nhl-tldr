const axios = require('axios');

const users = [{ id: 1 }, { id: 2 }, { id: 3 }];

function addNameToUser(user) {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}`)
    .then(({ data }) => {
      console.log(data.name);
      return {
        ...user,
        name: data.name
      }
    });
}

const requests = users.map((user, index) => {
  // create promises here to have something to track in Promise.all
  return new Promise((resolve) => { 
    setTimeout(() => {
      console.log(index);
      resolve(addNameToUser(user));
    }, index * 2000);
  });
});

Promise.all(requests).then((updatedArr) => {
  console.log(updatedArr);
});