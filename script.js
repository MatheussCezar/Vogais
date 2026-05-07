//----------VARIAVEIS GLOBAIS----------//
let cartasSelecionadas = []
const canvas = document.getElementById('areaJogavel');

//----------FUNÇÕES----------//
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

function criarCarta(palavra, index){
    const carta = document.createElement("div");
    carta.classList.add("carta");
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
                ${palavra}
            </div>

            <div class="verso"></div>

        </div>
    `;

    carta.addEventListener("click", () => {
        if(carta.dataset.estado == "virada" && cartasSelecionadas.length < 2){
            carta.classList.toggle("virada");
            carta.dataset.estado = "aberta";
            cartasSelecionadas.push(carta);
            setTimeout(()=>{
                verificarCartas();
            },2000);
            
        }
    });
    console.log(carta);
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
    })
}

function mostrarCartas(){
    const cartas = document.querySelectorAll(".carta");

    cartas.forEach((elemento)=>{
        elemento.classList.toggle("virada");
    })

    setTimeout(() => {
        cartas.forEach((elemento)=>{
            elemento.classList.toggle("virada");
        })
    },4000);
}

//----------FUNÇÃO PRINCIPAL----------//,
function main(){
    const palavras = ["uva","ovo","arvore","esfera","iris","ilha","onda","urso","escola"];

    const baralho = embaralhar(palavras);

    draw(baralho, canvas);
    
    mostrarCartas();
}

main();