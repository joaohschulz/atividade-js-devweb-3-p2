const formulario = document.querySelector("#formulario");
const titulo = document.querySelector("#titulo");
const anoPublicacao = document.querySelector("#anoPublicacao");
const autor = document.querySelector("#autor");
const paginas = document.querySelector("#paginas");
const _status = document.querySelector("#_status");
const saida = document.querySelector("#saida")

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const novoLivro = {
        titulo: titulo.value.trim(),
        anoPublicacao: anoPublicacao.value.trim(),
        autor: autor.value.trim(),
        paginas: paginas.value.trim()
    }

    const validacoes = [
        novoLivro.titulo === "", 
        novoLivro.anoPublicacao === "",
        novoLivro.autor === "",
        novoLivro.paginas === "",
    ]
    if (validacoes.every(Boolean)) {
        _status.textContent = "Preencha os campos antes de enviar";
        _status.className = "alert alert-danger mt-3";
        return;
    }

    _status.textContent =  "Enviando Post....";
    _status.className = "alert alert-info mt-3";

    fetch("http://localhost:5201/api/Materiais/livro", {
        method: "POST",
        headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
        body: JSON.stringify(novoLivro),
    })
    .then(function (resposta) {
        if (!resposta.ok) throw new Error("A API respondeu com ERRO!");
        return resposta.json();
    })
    .then (function (dados) {
        saida.textContent = JSON.stringify(dados, null, 2);
        _status.textContent = "Livro cadastrado! Resultado exibido abaixo.";
        _status.className = "alert alert-success mt-3";
    })
    .catch (function (erro){
        saida.textContent = erro.message;
        _status.textContent = "Não foi possivel enviar os dados.";
        _status.className = "alert alert-danger mt-3"
    }) 


})