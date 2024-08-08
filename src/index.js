const jogadoresDisponiveis = [
    {
        Nome: "Mario",
        Velocidade: 4,
        Manobrabilidade: 3,
        Poder: 3,
        Pontos: 0,
        Resultado: 0
    },
    {
        Nome: "Princesa",
        Velocidade: 3,
        Manobrabilidade: 4,
        Poder: 2,
        Pontos: 0,
        Resultado: 0
    },
    {
        Nome: "Yoshi",
        Velocidade: 2,
        Manobrabilidade: 4,
        Poder: 3,
        Pontos: 0,
        Resultado: 0
    },
    {
        Nome: "Koopa",
        Velocidade: 5,
        Manobrabilidade: 2,
        Poder: 5,
        Pontos: 0,
        Resultado: 0
    },
    {
        Nome: "Luigi",
        Velocidade: 3,
        Manobrabilidade: 4,
        Poder: 3,
        Pontos: 0,
        Resultado: 0
    },
    {
        Nome: "Donkey Kong",
        Velocidade: 2,
        Manobrabilidade: 2,
        Poder: 5,
        Pontos: 0,
        Resultado: 0
    }
]

async function rolarDados(quantidade){

    if (quantidade == null || quantidade == undefined)
        quantidade = 6; 

    return Math.floor(Math.random() * quantidade) + 1;
}

async function GetFaseAleatoria() {
    let random = Math.random();
    let resultado;

    switch (true)
    {
        case random < 0.33:
            resultado = "RETA"
            break;
        case random < 0.66:
            resultado = "CURVA"
            break;
        default:
            resultado = "CONFRONTO"
            break;
    }

    return resultado;
}

async function Exibicao(jogadores, dados, atributos, fase) {

    let resultado = [];

    for(let i = 0; i< jogadores.length; i++)
    {
        resultado.push(dados[i] + atributos[i]);
        console.log(`${jogadores[i].Nome} 🎲 rolou um dado de ${fase} ${dados[i]} + ${atributos[i]} = ${resultado[i]}`);
        jogadores[i].Resultado = resultado[i];
    }

    if(fase == "CONFRONTO")
    {
        await Confronto(jogadores);
    }

    console.log("____________________________________________________________");
}

async function QuemAtacaQuem(jogadores)
{
    let ataques = jogadores.length;
    let combates = [];

    for(let i = 0; i < jogadores.length; i++)
    {
        let indexSelecionado = Math.floor(Math.random() * jogadores.length);

        if(jogadores[i].Nome != jogadores[indexSelecionado].Nome)
        {
            let combate = [jogadores[i], jogadores[indexSelecionado]];
            combates.push(combate)
        }

    }

    return combates;
}

async function Confronto(jogadores) {
    
    let combates = await QuemAtacaQuem(jogadores);

    console.log(`______________________________________________`);

    await combates.forEach(async (combate, i) => {
        console.log(`${combate[0].Nome} conforntou com ${combate[1].Nome} 🥊`)

        if(combate[0].Resultado > combate[1].Resultado)
        {
            jogadores[0].Pontos++;
            jogadores[1].Pontos -= jogadores[1].Pontos > 0 ? 1: 0;
            console.log(`${jogadores[0].Nome} venceu o confronto! ${jogadores[1].Nome} perdeu 1 ponto 🐢`);
        }
        else if(combate[1].Resultado > combate[0].Resultado)
        {
            jogadores[1].Pontos++;
            jogadores[0].Pontos -= jogadores[0].Pontos > 0 ? 1: 0;
            console.log(`${jogadores[1].Nome} venceu o confronto! ${jogadores[0].Nome} perdeu 1 ponto 🐢`);
        }
        else
        {
            console.log(`Ninguem marcou ponto!`);
        }
        
        console.log("____________________________________________________________")

    });
}

async function CalcularHabilidade(jogadores, dados, fase) {
    
    let resultadosDados = [];
    let resultadosAtributos = [];

    for(let i = 0; i < jogadores.length; i++)
    {
        if(fase === "RETA")
        {
            resultadosDados.push(dados[i]);
            resultadosAtributos.push(jogadores[i].Velocidade);
        }
        else if(fase === "CURVA")
        {
            resultadosDados.push(dados[i]);
            resultadosAtributos.push(jogadores[i].Manobrabilidade);
        }
        else if(fase === "CONFRONTO")
        {
            resultadosDados.push(dados[i]);
            resultadosAtributos.push(jogadores[i].Poder);
        }
    };

    await Exibicao(jogadores, resultadosDados, resultadosAtributos, fase);
}

async function EngineCorrida(jogadores) {

    let dados = [];
    
    for(let rodadas = 1; rodadas <= 5; rodadas++)
    {
        console.log(`🏁 Rodada ${rodadas}`);

        //descrobri a fase
        let fase = await GetFaseAleatoria();
        console.log(`Bloco ${fase}`);

        //rodar os dados
        await jogadores.forEach(async e => {
            dados.push(await rolarDados());
        });
        
        await CalcularHabilidade(jogadores, dados, fase);
    } 

}

async function Vencedores() {
    
    console.log("Resultado Final:");

    let resultado = jogadoresDisponiveis.sort((a, b) => b.Pontos - a.Pontos);

    await resultado.forEach(async (jogador, i) => {
        console.log(`${jogador.Nome}: ${jogador.Pontos} ponto(s)`);
    });
    

    let comparacaoPontos = jogadoresDisponiveis.every(i => i.Pontos === jogadoresDisponiveis[0].Pontos);

    if(comparacaoPontos == resultado.length)
    {
        console.log(`A Corrida terminou em Empate`);
    }
    else if ((comparacaoPontos < resultado.length) && comparacaoPontos > 1)
    {
        let i = comparacaoPontos -1;
        let nomes = '';
        do{
            nomes += ` ${jogadoresDisponiveis[i].Nome} `;
            i++;
        } while(i +1 == comparacaoPontos)
        console.log(`\n ${nomes}venceram a corrida! Parabéns! 🏆`);
    }
    else
    {
        console.log(`\n ${jogadoresDisponiveis[0].Nome} venceu a corrida! Parabéns! 🏆`);
    }  
}

async function DefinindoJogadores(quantidadeJogador) {

    let JogadoresCopia = [...jogadoresDisponiveis];
    let personagens = [];

    for (let i = 0; i < quantidadeJogador; i++) {
        
        let indexSelecionado = Math.floor(Math.random() * JogadoresCopia.length);
        
        personagens.push(JogadoresCopia.splice(indexSelecionado, 1)[0]);
    }

    return personagens;
}

async function SelecionarJogadores() {
    
    let quantidadeJogador = 0;
    
    do
    {
        quantidadeJogador = await rolarDados();
    }
    while(quantidadeJogador <= 1)

    return await DefinindoJogadores(quantidadeJogador);
}


(async function main(){

    let jogadoresSelecionados = await SelecionarJogadores();

    console.log(`Quem são nossos jogadores! \n`);

    await jogadoresSelecionados.forEach(async (jogador, i) => {
        console.log(`🏎️ Nº${i+1} - ${jogador.Nome} selecionado \n`);
    });

    console.log(`🏁🚨 Iniciando a Corrida! \n`);

    await EngineCorrida(jogadoresSelecionados);
    await Vencedores();
})()

