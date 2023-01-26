const app = require('express')();
const bodyParser = require('body-parser');
const PORTA = process.env.PORT || 8080;
// Cria um servidor HTTP e uma escuta de requisições para a porta 8080

app.use(bodyParser.json());
//lista de alunos
let alunos = [
    {codigo:1, nome: 'Carlos Alberto', nota1: 10, nota2: 7},
    {codigo:2, nome: 'Maiara Costa', nota1: 5, nota2: 3},
    {codigo:3, nome: 'Carolaine Silva', nota1: 9, nota2: 2},
    {codigo:4, nome: 'Leticia Pascoal',nota1: 9, nota2: 8},
]

/**
 * Retorna todos alunos em json
 */
app.get('/alunos', (request, response) => response.json(alunos))

/**
 * Buscar UM único recurso
 */
app.get('/alunos/:codigo', (request, response) =>
response.json(alunos.filter(value => value.codigo == request.params.codigo)))

/**
 * Inserir dados no servidor - BD
 */
app.post('/alunos', (request, response) =>{
    const aluno = request.body;
    alunos.push(aluno);
    response.json(alunos);
})

/**
 * Atualizar nota do aluno
 */
 app.put('/alunos/:codigo/:nota1/:nota2', (request, response) => {
    const codigo = request.params.codigo;
    const nota1 = request.params.nota1;
    const nota2 = request.params.nota2;

    let aluno = alunos.filter(value => value.codigo == codigo);

    aluno[0].nota1 = nota1;
    aluno[0].nota2 = nota2;

    response.json(aluno[0]);
})

app.delete('/alunos/:codigo', (request, response) => {
    const codigo = request.params.codigo;
    alunos = alunos.filter(value => value.codigo != codigo);
    response.json(alunos);
})

app.listen(PORTA,'localhost',()=>{
    console.log('Servidor de pé em http://localhost:8080');
    console.log('Para desligar o servidor: Crtl + c');
   })