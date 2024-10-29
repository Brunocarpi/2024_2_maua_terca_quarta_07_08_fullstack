const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const app = express();

app.use(cors()); 
app.use(express.json());

app.use (express.json())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongo (){
    await mongoose.connect(`mongodb+srv://brunocarpi385:bruno2016@bruno.kkmhe.mongodb.net/?retryWrites=true&w=majority&appName=Bruno`)
}



app.get("/filmes", async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post("/filmes", async (req, res) => {
    
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um objeto de acordo com o modelo Filme
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find() 
    res.json(filmes)
})
app.post("/singup", async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuario = new Usuario ({login: login, password: password})
    await usuario.save()
    res.end()
})
app.listen(3000, () => {
    try {
        conectarAoMongo()
        console.log("server up and running e conexão ok");
        }
    catch (e) {
        console.log ('erro na conexão', e)
        }}
)