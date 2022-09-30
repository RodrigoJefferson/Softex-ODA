const express = require('express');

const app = express();

app.get('/project', (request, response) => { 
    return response.send ('Hello World!');
});

app.get('/', (request, response) => { 
    return response.send ('Hello World');
});

app.listen(7777, ()=> console.log("Servidor ativo"));