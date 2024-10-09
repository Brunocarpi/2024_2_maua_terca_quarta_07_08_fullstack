const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmeEndpoint = '/filmes'

async function obterFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmeEndpoint}`;
    console.log(`Requisitando: ${URLcompleta}`); // Adicione este log

    try {
        const response = await axios.get(URLcompleta);
        console.log(response); // Adicione este log para ver a resposta completa
        const filmes = response.data;
        console.log(filmes); // Adicione este log para ver os dados dos filmes
        
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
        //console.error(`Erro ao obter filmes: ${error}`); // Adicione este log para capturar erros
    }
}