export function consultarAluno() {
    let res = document.getElementById("res")

    let consultar = document.getElementById("consultar")

    res.innerHTML = ``

    consultar.addEventListener("click", async e => {
        e.preventDefault()

        let id = document.getElementById("id").value

        if (!id || isNaN(id) || id <= 0 || undefined || null) {
            alert("Por favor, informe o ID do aluno.")
            return
        }

        consultar.disabled = true
        consultar.textContent = "Consultando..."

        res.innerHTML += `<label>Consultando...</label>`

        await fetch(`http://localhost:8081/aluno/${id}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar o aluno");
                return resp.json()
            })
            .then(aluno => {
                res.innerHTML = ``
                res.innerHTML += `
                    <table border="1">
                        <thead>
                            <tr>
                                <th>COD</th>
                                <th>Nome</th>
                                <th>Matricula</th>
                                <th>Telefone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody id="resRelatAlunoText">
                            <tr>
                                <td>${aluno.codAluno}</td>
                                <td>${aluno.nome} ${aluno.sobrenome}</td>
                                <td>${aluno.matricula}</td>
                                <td>${aluno.telefone}</td>
                                <td>${aluno.email}</td>
                            </tr>
                        </tbody>
                    </table>
                `
            })
            .catch((err) => {
                console.error("Erro ao consultar o aluno: ", err)
                alert("Erro ao consultar o aluno. Verifique o ID informado.")
            })
            .finally(() => {
                consultar.disabled = false
                consultar.textContent = "Consultar"
            })
    })
}