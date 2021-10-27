var el = [];
var itemSelecionado = '';
var indiceItemSelecionado = null;
let botaoConfirmar = '';
let indiceRespostaCerta = null;

// função que carrega um arquivo selecionado e chama uma função de 
// retorno
function lerArquivoDeTexto(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

// Função para controlar o check da resposta escolhida
function aoSelecionarResposta(evt) {
    if(itemSelecionado){
        itemSelecionado.classList.remove("selecionada");
    }
    let indice = parseInt(evt.target.id.replace("a",""));
    if(indiceItemSelecionado == indice){
        el[indice - 1].classList.remove("selecionada");
        botaoConfirmar.style.display = 'none';
        itemSelecionado = ''; 
        indiceItemSelecionado = null; 
    } else {
        el[indice - 1].classList.add("selecionada");
        itemSelecionado = el[indice - 1]; 
        indiceItemSelecionado = indice; 
        botaoConfirmar.style.display = 'block'
    }
}
// função disparada ao clicar em confirmar 
// mostra o feedback de acordo com a opção selecionada 
// esconde o botão de confirmar e remove os eventos
function aoConfirmar(evt) {
    if(indiceItemSelecionado == indiceRespostaCerta){
        document.getElementById("feedbackPositivo").classList.remove("feedbacksNone");
    }else{
        document.getElementById("feedbackNegativo").classList.remove("feedbacksNone");
    }
    
    botaoConfirmar.style.display = 'none';
    botaoConfirmar.removeEventListener("click", aoConfirmar, false);

    for (let item of el) {
        item.removeEventListener("click", aoSelecionarResposta, false);
    }
}

// Função que inicializa os eventos e carrega as alternativas
function carregamentoInicial() {
    el = document.getElementsByClassName("alternativa");
    for (let item of el) {
        item.addEventListener("click", aoSelecionarResposta, false);
    }
    botaoConfirmar = document.getElementsByClassName("bt-confirmar")[0];
    botaoConfirmar.addEventListener("click", aoConfirmar, false);
}


lerArquivoDeTexto("data/exercicio.js", function(text){
    indiceRespostaCerta = parseInt(JSON.parse(text)[0][0].gabarito[0].resposta.replace("a",""));
});
document.addEventListener("DOMContentLoaded", carregamentoInicial, false);
