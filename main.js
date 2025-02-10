const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"/>'; //inserindo emojis de aprovação ou reprovação;
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>';
const atividades = []; //isto é um array, criado para somar todas as atividades
const notas = []; //isto é um array, criado para somar todas as notas
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima: "));//permite ao usuário personalizar a nota mínima;

let linhas ='';//variável criada para que várias matérias e notas sejam inseridas e a tabela seja alimentada criando novas linhas a cada conteúdo, e não substituindo o valor a cada nova inserção. Fica no topo do código (valor global) pois se ficar dentro da tag do Listener ela será resetada a cada nova inserção.

form.addEventListener('submit', function (e){
    e.preventDefault();//remover função automática de atualizar a página quando apertar "Adicionar+"

    adicionaLinha(); //autoexplicativo (chama a função de add a linha ao clicar no botão "Adicionar+")
    atualizaTabela(); //chama a função de inserir dados na tabela, logo após ter criado nova linha para tal
    atualizaMediaFinal();
});

function adicionaLinha() { //este trecho inicialmente foi criado dentro do 'addEventListener' mas foi separado posteriormente para ele não ficar muito cheio
    const inputNomeAtividade = document.getElementById('nome-atividade'); //capturando campos de preenchimento
    const inputNotaAtividade = document.getElementById('nota-atividade'); //capturando campos de preenchimento

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade "${inputNomeAtividade.value}" já foi inserida.`)
    } else {
        atividades.push(inputNomeAtividade.value); // o PUSH irá transmitir os valores para a constante (atividades) criada para somar todas as atividades
        notas.push(parseFloat(inputNotaAtividade.value)); // o PUSH irá transmitir os valores para a constante (notas) criada para somar todas as notas. O parseFloat converte os valores informados em 'string' para números, permitindo a soma das médias

        let linha = '<tr>';//abertura da tag 'tr' para criação da variável que receberá o código html como uma string
            linha += `<td>${inputNomeAtividade.value}</td>`; //Esta atribuição é o que faz que a linha seja preenchida com os dados informados pelo usuário.
            linha += `<td>${inputNotaAtividade.value}</td>`;
            linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //Efeito ternário. Neste caso '?' serve como 'if' e ':' serve como 'else'
            linha += '</tr>';//fechamento da tag 'tr' 

        linhas += linha;//'+=' é uma concatenação, também poderia ter sido usado: 'linhas = linha + 'outro conteúdo'. 
    }

    inputNomeAtividade.value = '';//limpa os campos de preenchimento após os dados serem inseridos, liberando assim espaço para uma nova inserção sem o usuário precisar limpar manualmente os campos
    inputNotaAtividade.value = '';
}

function atualizaTabela() { //este trecho estava inicialmente junto da função 'adicionaLinha', mas ela ficou exclusiva para adicionar LINHA, enquanto esta função irá adicionar CONTEÚDO às linhas criadas
    const corpoTabela = document.querySelector('tbody'); //criando constante para inserir o conteúdo dentro do corpo da tabela
    corpoTabela.innerHTML = linhas; //para inserir um conteúdo dentro de uma tag utilizamos o atributo 'innerHTML'
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for (let i=0; i < notas.length; i++){ //isso é um laço
        somaDasNotas += notas[i]; //'+=' é uma concatenação. Poderia ser: 'somaDasNotas = somaDasNotas + 'outro valor'
    }

    return somaDasNotas / notas.length;
}