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
    adicionarListener(carta)
    carta.classList.add("cartaVirada");
    carta.classList.add(palavra);
    carta.style.left = `${index * 10}px`;
    return carta;
}

function adicionarListener(carta){
    carta.addEventListener("click", () => {
        if(carta.classList[0] == "cartaVirada" || carta.classList[1] == "cartaVirada"){
            carta.classList.remove("cartaVirada");
            carta.classList.add("cartaAberta");
            carta.innerHTML = carta.classList[0];
        }else{
           carta.classList.remove("cartaAberta");
            carta.classList.add("cartaVirada");
            carta.innerHTML = ""; 
        }
        
    })
}

function draw(baralho, canva){
    canva.innerHTML = "";
    baralho.forEach((elemento, index) => {
        canva.appendChild(criarCarta(elemento, index));
    })
}

//----------FUNÇÃO PRINCIPAL----------//
function main(){
    const canva = document.getElementById('areaJogavel');

    const palavras = ["uva","ovo","arvore","esfera","iris"];

    const baralho = embaralhar(palavras);

    draw(baralho, canva);
}

main();