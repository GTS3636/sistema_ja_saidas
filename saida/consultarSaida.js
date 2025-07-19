import { insertIntoList } from "../index.js"
export function consultarSaida() {
    let res = document.getElementById("res")
    let consultarSaida = document.getElementById("consultarSaida")

    consultarSaida.addEventListener("click", async e => {
        e.preventDefault()

        let idSaida = document.getElementById("idSaida").value

        if (!idSaida || isNaN(idSaida) || idSaida <= 0) {
            alert("Por favor, informe um ID válido para a saída.")
            return
        }

        consultarSaida.disabled = true;
        consultarSaida.textContent = "Consultando..."

        await fetch(`http://localhost:8081/saida/${idSaida}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar a saída.")
                return resp.json()
            })
            .then(saida => {
                res.innerHTML = `
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome Aluno</th>
                                    <th>Motivo</th>
                                    <th>Local Destino</th>
                                    <th>Status</th>
                                    <th>Hora Saída</th>
                                    <th>Hora Retorno</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${saida.id}</td>
                                    <td>${saida.nomeAluno}</td>
                                    <td>${saida.motivo}</td>
                                    <td>${saida.localDestino}</td>
                                    <td>${saida.status}</td>
                                    <td>${saida.horaSaida}</td>
                                    <td>${saida.horaRetorno || "Ainda não retornou"}</td>
                                </tr>
                            </tbody>
                        </table>
                    `
            })
            .catch(err => {
                console.error("Erro ao consultar a saída: ", err)
                alert("Erro ao consultar a saída. Verifique o ID informado.")
                res.innerHTML = `<label>Erro ao consultar a saída. Verifique o ID informado.</label>`
            })
            .finally(() => {
                consultarSaida.disabled = false;
                consultarSaida.textContent = "Consultar Saída"
            })
        insertIntoList()
    })
}