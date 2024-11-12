const protocolo = 'http://'
const baseURL = 'localhost:3000'




function exibeAlerta (seletor,innerHTML, classesTOAdd, classesTORemove, timeout) {
            let alert = document.querySelector(seletor)
            alert.innerHTML = innerHTML
            alert.classList.add (...classesTOAdd)
            alert.classList.remove (...classesTORemove)
            setTimeout (() => {
                alert.classList.remove(...classesTOAdd)
                alert.classList.add (...classesTORemove)
            }, timeout)
}
function escondeModal (idModal, timeout) {
        setTimeout (() => {
        let modal = bootstrap.Modal.getInstance(document.querySelector(idModal))
        modal.hide()
    }, timeout)
}

async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
    console.log(`Requisitando: ${URLcompleta}`); 

function listarFilmes (filmes) {
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody'[0])
    corpoTabela.innerHTML=""
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0);
        let celulaTitulo = linha.insertCell(0);
        let celulaSinopse = linha.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    }
}

    try {
        const response = await axios.get(URLcompleta);
        console.log(response); 
        const filmes = response.data;
        console.log(filmes); 
        
        let tabela = document.querySelector('.filmes');
        let corpoTabela = tabela.getElementsByTagName('tbody')[0];
        for (let filme of filmes) {
            let linha = corpoTabela.insertRow(0);
            let celulaTitulo = linha.insertCell(0);
            let celulaSinopse = linha.insertCell(1);
            celulaTitulo.innerHTML = filme.titulo;
            celulaSinopse.innerHTML = filme.sinopse;
        }
    } catch (error) {
    }
}
async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`;
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    if (titulo && sinopse) {
        tituloInput.value = ""
        sinopseInput.value = ""
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data
        listarFilmes(filmes)
    }
    else {
        exibeAlerta('.alert-filme', "Preencha todos os campos!!!", ['alert-danger', 'show'], ['d-none'], 2000)
    }
}
async function cadastrarUsuario(){
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro){
        //vamos cadastrar
        try {
            const cadastroEndpoint = '/signup'
            const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(URLcompleta,{login: usuarioCadastro, password: passwordCadastro})

            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""

            exibeAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!!!", ['show', 'alert-success'], ['d-none'], 2000)

            escondeModal('#modalCadastro', 2000)
        }
        catch (e){
            
            exibeAlerta('.alert-modal-cadastro', "Não foi possível realizar o cadastro!!!", ['show', 'alert-danger'], ['d-none'], 2000)

            escondeModal('#modalCadastro', 2000)
        }
    }
    else {
        exibeAlerta('.alert-modal-cadastro', "Preencha todos os campos!!!", ['show', 'alert-danger'], ['d-none'], 2000)

    }
}

