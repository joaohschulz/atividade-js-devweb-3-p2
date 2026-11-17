const formulario = document.querySelector("#formulario");
const id = document.querySelector("#id");
const _status = document.querySelector("#_status");
const saida = document.querySelector("#saida")


formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (id.value === "") {
        _status.textContent = "Informe um ID";
        _status.className = "alert theme-danger mt-3"
        return;
    }

    const confirmou = window.confirm(`Deseja solicitar a exclusão do material ${id.value}?`);
    if (!confirmou) return;

    _status.textContent = "Deletando material..."
    _status.className = "alert theme-info mt-3"

    fetch(`http://localhost:5201/api/Materiais/${id.value}`,
        { method: "DELETE", })

        .then(function (resposta) {
            if (!resposta.ok) throw new Error("A API respondeu com erro.");
            return resposta;
        })
        .then(function () {
            saida.textContent = `Exclusão simulada do material ${id.value} confirmada.`;
            _status.textContent = "DELETE realizado com sucesso.";
            _status.className = "alert theme-success mt-3";
        })
        .catch(function (erro) {
            saida.textContent = erro.message;
            _status.textContent = "Não foi possível excluir o post.";
            _status.className = "alert theme-danger mt-3";
        });
})