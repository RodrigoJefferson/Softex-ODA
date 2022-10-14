const Sequelize = require('sequelize');

const sequelize = new Sequelize("db1", "root", "roi", {
    host: "localhost", 
    dialect: "mysql",
});

sequelize.authenticate().then(function(){
    console.log ("O banco está ativo!");
}).catch(function(erro){
    console.log(erro)
})