const botao = document.querySelector("#buscar");
const _status = document.querySelector("#_status");
const saida = document.querySelector("#saida");


const URL_API = "http://localhost:5201/api/Materiais"

botao.addEventListener("click", function () {

    _status.textContent = "Consultado API.....";
    _status.className = "alert theme-info mt-3";
    saida.textContent = "Aguarde....";

    fetch(URL_API)
        .then(function (resposta) {
            if (!resposta.ok) throw new Error("ERRO NA API");
            return resposta.json();
        })
        .then(function (dados) {
            saida.textContent = JSON.stringify(dados, null, 2);
            _status.textContent = "Busca realizada com sucesso";
            _status.className = "alert theme-success mt-3"
        })
        .catch(function (erro) {
            saida.textContent = erro.message;
            _status.textContent = "Não foi possível fazer a consulta.";
            _status.className = "alert theme-danger mt-3";
        });
});