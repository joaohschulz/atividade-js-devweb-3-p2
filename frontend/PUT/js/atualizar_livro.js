const formulario = document.querySelector("#formulario");
const id = document.querySelector("#id");
const titulo = document.querySelector("#titulo");
const anoPublicacao = document.querySelector("#anoPublicacao");
const autor = document.querySelector("#autor")
const _status = document.querySelector("#_status")
const saida = document.querySelector("#saida")

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const livroAtualizado = {
        id: Number(id.value),
        titulo: titulo.value.trim(),
        anoPublicacao: anoPublicacao.value.trim(),
        autor: autor.value.trim(),
        paginas: paginas.value.trim()
    };

    const validacoes = [
        livroAtualizado.id === "" || !Number.isInteger(livroAtualizado.id)  || livroAtualizado.id <= 0,
        livroAtualizado.titulo === "", 
        livroAtualizado.anoPublicacao === "",
        livroAtualizado.autor === "",
        livroAtualizado.paginas === "",
    ]


    if (validacoes.some(Boolean)) {
        _status.textContent = "Preencha os campos antes de enviar";
        _status.className = "alert theme-danger mt-3";
        return;
    }

    _status.textContent = "Enviando atualizações...";
    _status.className = "alert theme-info mt-3";

    fetch(`http://localhost:5201/api/Materiais/livro/${livroAtualizado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(livroAtualizado),
    })
    .then (function (resposta) {
        if (!resposta.ok) throw new Error("API respondeu com erro.")
        return resposta.json();
    })
    .then (function (dados) {
        saida.textContent = JSON.stringify(dados, null, 2);
        _status.textContent = `O livro ${livroAtualizado.titulo} foi atualizado. O retorno é exibido abaixo.`
        _status.className = "alert theme-success mt-3"
    })
    .catch (function (erro) {
        saida.textContent = erro.message;
        _status.textContent = "Não foi possível atualizar o livro";
        _status.className = "alert theme-danger mt-3";
    }); 
});