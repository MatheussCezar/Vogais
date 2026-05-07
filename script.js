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
        carta.classList.toggle("virada");
        cartasSelecionadas.push(carta);
        verificarCartas()
    });
    return carta;
}

function verificarCartas(){
    if(cartasSelecionadas.length < 2){
        return;
    }
    palavra1 = cartasSelecionadas[0].dataset.palavra;
    palavra2 = cartasSelecionadas[1].dataset.palavra;
    if(palavra1[0] == palavra2[0]){
        canvas.removeChild(cartasSelecionadas[0]);
        canvas.removeChild(cartasSelecionadas[1]);
        cartasSelecionadas = [];
    } else {
        cartasSelecionadas[0].classList.toggle("virada");
        cartasSelecionadas[1].classList.toggle("virada");
        cartasSelecionadas = [];
    }
}

function draw(baralho, canvas){
    canvas.innerHTML = "";
    baralho.forEach((elemento, index) => {
        canvas.appendChild(criarCarta(elemento, index));
    })
}

//----------FUNÇÃO PRINCIPAL----------//
function main(){
    const palavras = ["uva","ovo","arvore","esfera","iris"];

    const baralho = embaralhar(palavras);

    draw(baralho, canvas);
}

main();