const formulario = document.querySelector("#formulario");
const id = document.querySelector("#id");
const titulo = document.querySelector("#titulo");
const anoPublicacao = document.querySelector("#anoPublicacao");
const edicao = document.querySelector("#edicao");
const mesPublicacao = document.querySelector("#mesPublicacao");
const _status = document.querySelector("#_status");
const saida = document.querySelector("#saida")


formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const atualizarRevista = {
        id: Number(id.value),
        titulo: titulo.value.trim(),
        anoPublicacao: anoPublicacao.value.trim(),
        edicao: edicao.value.trim(),
        mesPublicacao: mesPublicacao.value.trim()
    }

    const validacoes = [
        atualizarRevista.id.value === "" || !Number.isInteger(atualizarRevista.id) || atualizarRevista.id <= 0,
        atualizarRevista.titulo === "",
        atualizarRevista.anoPublicacao === "",
        atualizarRevista.edicao === "",
        atualizarRevista.mesPublicacao === "",
    ]

    if (validacoes.some(Boolean)) {
        _status.textContent = "Preencha os campos antes de enviar";
        _status.className = "alert theme-danger mt-3";
        return;
    }

    _status.textContent = "Enviando Post....";
    _status.className = "alert theme-info mt-3";

    fetch(`http://localhost:5201/api/Materiais/revista/${atualizarRevista.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json; charset=UTF-8",},
        body: JSON.stringify(atualizarRevista),
    })
        .then(function (resposta) {
            if (!resposta.ok) throw new Error("A API respondeu com ERRO!");
            return resposta.json();
        })
        .then(function (dados) {
            saida.textContent = JSON.stringify(dados, null, 2);
            _status.textContent = `Revista ${atualizarRevista.titulo} atualizada! Resultado exibido abaixo.`;
            _status.className = "alert theme-success mt-3";
        })
        .catch(function (erro) {
            saida.textContent = erro.message;
            _status.textContent = "Não foi possivel enviar os dados.";
            _status.className = "alert theme-danger mt-3"
        })


})