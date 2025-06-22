const carrinho = {};

// Salva o carrinho no localStorage
function atualizarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Adiciona produtos ao carrinho
function adicionarCarrinho(quantidade, produto, precoUnitario) {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || {};

    let novaQuantidade = quantidade;
    let novoPrecoTotal = precoUnitario * quantidade;

    // Se já tiver o produto, soma com o que já está salvo
    if (carrinhoAtual[produto]) {
        novaQuantidade += carrinhoAtual[produto].quant;
        novoPrecoTotal += carrinhoAtual[produto].preço;
    }

    // Atualiza o objeto local
    carrinho[produto] = {
        quant: novaQuantidade,
        preço: parseFloat(novoPrecoTotal.toFixed(2)) // valor com 2 casas decimais
    };

    atualizarCarrinho();
}
function statusCarrinho(){

    const  carrinhoAtual = JSON.parse(localStorage.getItem('carrinho'))
    if(carrinhoAtual){
        $('#stt-carrinho').css({"display":"none"});
        $('#carrinho-ativo').css({"display":"block"})
    }else{
        $('#stt-carrinho').css({"display":"block"})
        $('#carrinho-ativo').css({"display":"none"})
    }
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    const tbody = document.querySelector('#tabela-carrinho tbody');
    tbody.innerHTML = ''; // limpa a tabela antes de preencher

    if (Object.keys(carrinho).length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
        td.textContent = 'Carrinho vazio';
        td.style.fontStyle = 'italic';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
    }

    for (const produto in carrinho) {
        const { quant, preço } = carrinho[produto];

        const tr = document.createElement('tr');

        const tdProduto = document.createElement('td');
        tdProduto.textContent = produto;
        tr.appendChild(tdProduto);

        const tdQuant = document.createElement('td');
        tdQuant.textContent = quant;
        tr.appendChild(tdQuant);

        const tdPreco = document.createElement('td');
        tdPreco.textContent = `R$ ${preço.toFixed(2)}`;
        tr.appendChild(tdPreco);

        tbody.appendChild(tr);
    }
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carregarCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();

    const btnLimpar = document.querySelector('.btn-limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparCarrinho);
    }

    // Você pode adicionar funcionalidade ao botão "comprar" aqui também, se quiser
});

$(document).ready(function(){
    $("#btn-limpar").click(function(){
        localStorage.removeItem('carrinho');
        $("#carrinho-ativo").css({"display":"none"})
        $("#stt-carrinho").css({"display":"block"})
        
    })
     $("#btn-comprar").click(function(){
        localStorage.removeItem('carrinho');
        $("#carrinho-ativo").css({"display":"none"})
        $("#stt-carrinho").css({"display":"block"})
        alert('compra realizada com sucesso!')
    })
})
 statusCarrinho()