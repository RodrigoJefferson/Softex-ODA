const app = require('express')();
const bodyParser = require('body-parser');
const PORTA = process.env.PORT || 8080;

app.use(bodyParser.json());
//lista de alunos
let alunos = [
    {codigo:1, nome: 'Lelinho do gera', nota1: 10, nota2: 7},
    {codigo:2, nome: 'Sleeper', nota1: 5, nota2: 3},
    {codigo:3, nome: 'EnoKi', nota1: 9, nota2: 2},
    {codigo:4, nome: 'Mago Capivara',nota1: 9, nota2: 8},
]

app.get('/alunos', (req, res) => res.json(alunos));


app.get('/alunos/:codigo', (req, res) =>
res.json(alunos.filter(value => value.codigo == req.params.codigo)));

var nota01 = function (req, res) {
    const result = alunos.filter(value => value.codigo == req.params.codigo);
    var Nome = result[0].nome;
    const nota1 = result[0].nota1;
    res.json(`${Nome} obteve ${nota1} na primeira prova`);
    console.log(nota1);
 }

var nota02 = function (req, res) {
    const result = alunos.filter(value => value.codigo == req.params.codigo);
    var Nome = result[0].nome;
    const nota2 = result[0].nota2;
    res.json(`${Nome} obteve ${nota2} na primeira prova`);
    console.log(nota2);
 }

var mediaFinal = function (req, res) {
    const result = alunos.filter(value => value.codigo == req.params.codigo);
    var Nome = result[0].nome;
    const nota1 = result[0].nota1;
    const nota2 = result[0].nota2;
    const media = (nota1+nota2)/2;

    if (media >= 7) {
        var situacao = 'APROVADO';
    } else{
        var situacao = 'REPROVADO'
    }
    res.json(`${Nome} obteve ${media} na média final e está ${situacao}`);
    console.log(media);
 }

app.get('/alunos/:codigo/nota1', [nota01]);
app.get('/alunos/:codigo/nota2', [nota02]);
app.get('/alunos/:codigo/mediafinal', [mediaFinal]);


app.listen(PORTA,'localhost',()=>{
    console.log('Servidor de pé em http://localhost:8080');
    console.log('Para desligar o servidor: Crtl + c');
   })