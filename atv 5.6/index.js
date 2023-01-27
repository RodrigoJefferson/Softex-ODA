const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORTA = 8080;

//lista de alunos
let alunos = []

app.use(cors());
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

app.listen(PORTA,'localhost',()=>{
    console.log('Servidor de pé em http://localhost:8080');
    console.log('Para desligar o servidor: Crtl + c');
})

/**
 * Retorna todos alunos em json
 */
app.get('/alunos', (request, response) => response.json(alunos))

/**
 * Buscar UM único recurso
 */
app.get('/alunos/:codigo', (request, response)=>{
    let codigo = request.params.codigo;

    if (codigo > 0 && codigo <= alunos.length){
        response.status(200).send(alunos.filter(value => value.codigo == request.params.codigo));
    } 
    else {
        response.status(404).send("Aluno não Matriculado");
    }
});

/**
 * Matricular aluno
 */
 app.post('/alunos/matricula', (request, response) =>{
    let codigo = alunos.length + 1;
    let aluno = request.body;
    aluno.codigo = codigo;
    alunos.push(aluno);
    console.log(aluno);

    response.status(201).send(`Aluno inserido com sucesso`);
})

/**
 * Atualizar nota do aluno
 */
 app.put('/alunos/editarnota/:codigo/:nota1/:nota2', (request, response) => {
    let codigo = request.params.codigo;
    let nota1 = parseInt(request.params.nota1,10);
    let nota2 = parseInt(request.params.nota2,10);

    let aluno = alunos.filter(value => value.codigo == codigo);
    if ( aluno.length !== 0) {
        response.status(200).send(alunos.filter(value => value.codigo == request.params.codigo));
        aluno[0].nota1 = nota1;
        aluno[0].nota2 = nota2;
        console.log("Nota atualizada");
        response.status(200).send(aluno[0]);
    } 
    else {
        response.status(404).send("Aluno não Matriculado");
    }
    
})


var nota01 = function (request, response) {
    const codigo = request.params.codigo;
    let result = alunos.filter(value => value.codigo == codigo);
    if ( result.length !== 0) {
    var Nome = result[0].nome;
    const nota1 = result[0].nota1;
    response.status(200).json(`${Nome} obteve ${nota1} na primeira prova`);
    console.log(nota1);
 } else {
    response.status(404).send("Aluno não encontrado");
    }
 }
var nota02 = function (request, response) {
    const codigo = request.params.codigo;
    let result = alunos.filter(value => value.codigo == codigo);
    if ( result.length !== 0) {
    var Nome = result[0].nome;
    const nota2 = result[0].nota2;
    response.status(200).json(`${Nome} obteve ${nota2} na segunda prova`);
    console.log(nota2);
} else {
    response.status(404).send("Aluno não encontrado");
    }
}
var mediaFinal = function (request, response) {
    const codigo = request.params.codigo;
    let result = alunos.filter(value => value.codigo == codigo);
    if ( result.length !== 0) {
    var Nome = result[0].nome;
    const nota1 = result[0].nota1;
    const nota2 = result[0].nota2;
    const media = (nota1+nota2)/2;

        if (media >= 7) {
            var situacao = 'APROVADO';
        } else{
            var situacao = 'REPROVADO'
        }
        response.status(200).json(`${Nome} obteve ${media} na média final e está ${situacao}`);
    console.log(media);
 }else {
    response.status(404).send("Aluno não encontrado");
    }
}

app.get('/alunos/:codigo/nota1', [nota01]);
app.get('/alunos/:codigo/nota2', [nota02]);
app.get('/alunos/:codigo/mediafinal', [mediaFinal]);


app.delete('/alunos/deletar/:codigo', (request, response) => {
    const codigo = request.params.codigo;
    if (codigo > 0 && codigo <= alunos.length){
        alunos = alunos.filter(value => value.codigo != codigo);
        response.status(200).send('Aluno desmatriculado');
        console.log(alunos);
    } 
    else {
        response.status(404).send("Aluno não encontrado");
    }
})

app.all('*', (req, res)=>{
    res.status(404).send("Página não encontrada");
});


