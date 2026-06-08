//----------VARIAVEIS GLOBAIS----------//
let cartasSelecionadas = []
const canvas = document.getElementById("areaJogavel");
let mostrandoCartas = true;

const palavrasPossiveis = [
        ["Abacaxi", "Amora", "Anel", "Arvore", "Aviao"],
        ["Elefante", "Escada", "Escova", "Esmalte", "Espelho"],
        ["Igreja", "Ilha", "Ima", "Indio", "Iogurte"],
        ["Olho", "Orelha", "Osso", "Ovelha", "Ovo"],
        ["Unha", "Unicornio", "Universo", "Urso", "Uva"]
    ];


//----------FUNÇÕES----------//

function mostrarTutoras(){
    const tutoras = document.getElementById("ajuda");
    tutoras.classList.remove("hidden");
}

function fecharTutoras(){
    const tutoras = document.getElementById("ajuda");
    tutoras.classList.add("hidden");
}

function embaralhar(palavras){
    let palavrasTamanho = palavras.length;
    for(let i = 0; i < palavrasTamanho; i++){
        palavras.push(palavras[i][0]);
    }

    for(let i = palavras.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [palavras[i] , palavras[j]] = [palavras[j], palavras[i]];
    }
    return palavras;
}

function escolherPalavras(palavrasPossiveis) {
    const palavrasSelecionadas = [];
    for(let i = 0; i<palavrasPossiveis.length; i++){
        let j = Math.floor(Math.random() * (palavrasPossiveis[i].length));
        palavrasSelecionadas.push(palavrasPossiveis[i][j]);
        palavrasPossiveis[i].splice(j, 1);
    }
    return palavrasSelecionadas;
}

function criarCarta(palavra, index){
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.style.position = "absolute";

    const coluna = index % 5;
    const linha = Math.floor(index / 5);

    carta.style.left = `${coluna * 210}px`;
    carta.style.top = `${linha * 210}px`;

    if(palavra.length > 1){
        carta.dataset.tipo = "palavra";
    }else{
        carta.dataset.tipo = "letra";
    }
    carta.dataset.estado = "virada"
    carta.dataset.palavra = palavra;
    carta.innerHTML = `
        <div class="carta-inner">

            <div class="frente">
                <img src="./imagens/${palavra[0]}/${palavra}.png">
            </div>

            <div class="verso"></div>

        </div>
    `;

    carta.addEventListener("click", () => {
        if(carta.dataset.estado == "virada" && cartasSelecionadas.length < 2 && !mostrandoCartas){
            carta.classList.toggle("virada");
            carta.dataset.estado = "aberta";
            cartasSelecionadas.push(carta);
            setTimeout(()=>{
                verificarCartas();
            },2000);
            
        }
    });
    return carta;
}

function verificarCartas(){
    if(cartasSelecionadas.length < 2){
        return;
    }
    palavra1 = cartasSelecionadas[0].dataset.palavra;
    palavra2 = cartasSelecionadas[1].dataset.palavra;

    palavra1Tipo = cartasSelecionadas[0].dataset.tipo;
    palavra2Tipo =cartasSelecionadas[1].dataset.tipo;
    
    if(palavra1[0] == palavra2[0] && (palavra1Tipo == "palavra" && palavra2Tipo == "letra" || palavra1Tipo == "letra" && palavra2Tipo == "palavra")){
        canvas.removeChild(cartasSelecionadas[0]);
        canvas.removeChild(cartasSelecionadas[1]);
        cartasSelecionadas = [];
    } else {
        cartasSelecionadas[0].classList.toggle("virada");
        cartasSelecionadas[1].classList.toggle("virada");
        cartasSelecionadas[0].dataset.estado = "virada";
        cartasSelecionadas[1].dataset.estado = "virada";
        cartasSelecionadas = [];
    }
}

function draw(baralho, canvas){
    canvas.innerHTML = "";
    baralho.forEach((elemento, index) => {
        canvas.appendChild(criarCarta(elemento, index));
    });
}

function mostrarCartas(){
    mostrandoCartas = true;
    const cartas = document.querySelectorAll(".carta");

    cartas.forEach((elemento)=>{
        elemento.classList.toggle("virada");
    });

    setTimeout(() => {
        cartas.forEach((elemento)=>{
            elemento.classList.toggle("virada");
        })
        mostrandoCartas = false;
    },4000);
}

//----------FUNÇÃO PRINCIPAL----------//,
function main(){
    const palavrasSelecionadas = escolherPalavras(palavrasPossiveis);

    const baralho = embaralhar(palavrasSelecionadas);

    draw(baralho, canvas);
    
    mostrarCartas();
}

main();