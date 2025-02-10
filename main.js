const form = document.getElementById('form-agenda');

let linhas ='';
const nomes = [];// Criando o array para armazenar os nomes
const telefones = [];// Criando o array para armazenar os telefones

form.addEventListener('submit', function (e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
});

function adicionaLinha() { 
    const inputNome = document.getElementById('nome'); //capturando dados dos campos de preenchimento
    const inputTelefone = document.getElementById('telefone'); //capturando dados dos campos de preenchimento

    if (nomes.includes(inputNome.value)) {
        alert(`O contato de "${inputNome.value}" já foi inserido.`)
    } else {
        nomes.push(inputNome.value); //Adicionando o nome à lista
        telefones.push(inputTelefone.value); //Adicionando o telefone à lista

        let linha = '<tr>';//abertura da tag 'tr' para criação da variável que receberá o código html como uma string
        linha += `<td>${inputNome.value}</td>`; //Esta atribuição é o que faz que a linha seja preenchida com os dados informados pelo usuário.
        linha += `<td>${inputTelefone.value}</td>`;
        linha += '</tr>';//fechamento da tag 'tr' 

        linhas += linha;//'+=' é uma concatenação, também poderia ter sido usado: 'linhas = linha + 'outro conteúdo'. 
    }

    inputNome.value = '';//limpa os campos de preenchimento após os dados serem inseridos, liberando assim espaço para uma nova inserção sem o usuário precisar limpar manualmente os campos
    inputTelefone.value = '';
}

function atualizaTabela() { 
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas; //para inserir um conteúdo dentro de uma tag utilizamos o atributo 'innerHTML'
}