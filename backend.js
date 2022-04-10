const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! :)');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
       {
         id: 'cat456', 
         name: 'Kate',
         job: 'Bouncer',
      }
    ]
 }

app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined){
      let resultName = findUserByName(name);
      resultName = {users_list: resultName};
     if (job != undefined){
        let resultJob = findUserByJob(job, resultName);
        resultJob = {users_list: resultJob};
        res.send(resultJob);
     }
     else{
        
        res.send(resultName);
     }
   }
   else{
      res.send(users);
   }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}
const findUserByJob = (job, names) => { 
   return names['users_list'].filter( (user) => user['job'] === job); 
}

app.get('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
       result = {users_list: result};
       res.send(result);
   }
   
});

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}

app.delete('/users/:id', (req, res) => {
   const id = req.params.id;
   deleteById(id);
   res.status(200).end();
});

function deleteById(id) {
   for (var i=0; i<users['users_list'].length;i++) {
      if (users['users_list'][i]['id'] == id) {
        users['users_list'].splice(i, 1);
      }
    }
}

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   addUser(userToAdd);
   res.status(200).end();
});

function addUser(user){
   users['users_list'].push(user);
}


  

