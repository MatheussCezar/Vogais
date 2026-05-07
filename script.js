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
    });
    return carta;
}

function draw(baralho, canvas){
    canvas.innerHTML = "";
    baralho.forEach((elemento, index) => {
        canvas.appendChild(criarCarta(elemento, index));
    })
}

//----------FUNÇÃO PRINCIPAL----------//
function main(){
    const canvas = document.getElementById('areaJogavel');

    const palavras = ["uva","ovo","arvore","esfera","iris"];

    const baralho = embaralhar(palavras);

    draw(baralho, canvas);
}

main();