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
    carta.classList.add("carta", "cartaVirada");
    carta.dataset.palavra = palavra;
    adicionarListener(carta);
    return carta;
}

function adicionarListener(carta){
    carta.addEventListener("click", () => {
        if(carta.classList.contains("cartaVirada")){
            carta.classList.remove("cartaVirada");
            carta.style.transform = "translateY(360deg)"
            carta.classList.add("cartaAberta");
            carta.innerHTML = carta.dataset.palavra;
        }else{
           carta.classList.remove("cartaAberta");
            carta.classList.add("cartaVirada");
            carta.innerHTML = ""; 
        }
        
    })
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