export async function listarSaidas() {
    let res = document.getElementById("res")
    res.innerHTML = `<label>Listando...</label>`
    await fetch("http://localhost:8081/saida")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta de dados das saidas!")
            }
            return resp.json()
        })
        .then(dados => {
            if (dados.length > 0) {
                res.innerHTML = ``
                res.innerHTML += `
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome Aluno</th>
                            <th>Nome Professor</th>
                            <th>Motivo</th>
                            <th>Local Destino</th>
                            <th>Status</th>
                            <th>Hora Saída</th>
                            <th>Hora Retorno</th>
                        </tr>
                    </thead>
                    <tbody id="resRelatSaidaText">

                    </tbody>
                </table>
            `
                let resRelatSaidaText = document.getElementById("resRelatSaidaText")
                resRelatSaidaText.innerHTML = ``
                dados.forEach(saida => {
                    resRelatSaidaText.innerHTML += `
                    <tr>
                        <td>${saida.codSaida}</td>
                        <td>${saida.nomeAluno}</td>
                        <td>${saida.nomeProfessor}</td>
                        <td>${saida.motivo}</td>
                        <td>${saida.localDestino}</td>
                        <td>${saida.status}</td>
                        <td>${saida.horaSaida && saida.status === "reprovado" || saida.status === "finalizado" ? saida.horaSaida : "Não saiu"}</td>
                        <td>${saida.horaRetorno && saida.status === "reprovado" || saida.status === "finalizado" ? saida.horaRetorno : "Não saiu"}</td>
                    </tr>
                `
                })
            } else {
                res.innerHTML = `<label>Não há saídas cadastradas.</label>`
            }
        })
        .catch((err) => {
            console.error("Erro no recebimento dos dados das saidas: ", err)
            alert("Erro ao listar as saídas. Verifique a conexão com o servidor ou se há saídas cadastradas.")
            res.innerHTML = `<label>Erro ao listar as saídas. Verifique a conexão com o servidor ou se há saídas cadastradas.</label>`
        })
}