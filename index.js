const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Adicione esta linha
app.use(express.json());

app.use (express.json())

//get http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Divertidamente",
        sinopse: "Com a mudança para uma nova cidade, as emoções de Riley, que tem apenas 11 anos de idade, ficam extremamente agitadas. Uma confusão na sala de controle do seu cérebro deixa a Alegria e a Tristeza de fora, afetando a vida de Riley radicalmente."
    },
    {
        titulo: "Oppenheimer",
        sinopse: "O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica."
    },
    {
        titulo: "The Batman",
        sinopse: "Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população."
    },
    {
        titulo: "Mad Max",
        sinopse: "Em um mundo pós-apocalíptico, Max Rockatansky acredita que a melhor forma de sobreviver é não depender de ninguém. Porém, após ser capturado pelo tirano Immortan Joe e seus rebeldes, Max se vê no meio de uma guerra mortal iniciada pela Imperatriz Furiosa, que tenta salvar um grupo de garotas. Também tentando fugir, Max aceita ajudá-la."
    }
] 
app.get("/filmes", (req, res) => {
    res.json(filmes)
})

app.post("/filmes", (req, res) => {
    //captura o que o usuário enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //monta o objeto filme para incluir na base
    const filme = {titulo: titulo, sinopse: sinopse}
    //adiciona o o novo filme à lista de filmes
    filmes.push(filme)
    //mostra a base atualizada
    res.json(filmes)
})

app.listen(3000, () => console.log("up and running"))
