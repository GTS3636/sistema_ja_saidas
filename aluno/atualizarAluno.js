export function atualizarAluno() {
    let res = document.getElementById("res")
    let consultar = document.getElementById("consultar")
    let atualizar = document.getElementById("atualizar")

    let nome = document.getElementById("primeiroNomeALuno")
    let sobrenome = document.getElementById("segundoNomeALuno")
    let matricula = document.getElementById("matriculaAluno")
    let telefone = document.getElementById("telefoneAluno")
    let email = document.getElementById("emailAluno")

    nome.disabled = true
    sobrenome.disabled = true
    matricula.disabled = true
    telefone.disabled = true
    email.disabled = true

    consultar.addEventListener("click", async e => {
        e.preventDefault()

        res.innerHTML = `<label>Consultando...</label>`
        consultar.disabled = true
        consultar.textContent = "Consultando Aluno..."

        nome.disabled = false
        sobrenome.disabled = false
        matricula.disabled = false
        telefone.disabled = false
        email.disabled = false

        let id = document.getElementById("id").value
        await fetch(`http://localhost:8081/aluno/${id}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar o aluno");
                return resp.json()
            })
            .then(aluno => {
                nome.value = aluno.nome
                sobrenome.value = aluno.sobrenome
                matricula.value = aluno.matricula
                telefone.value = aluno.telefone
                email.value = aluno.email

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
            })
            .finally(() => {
                consultar.disabled = false
                consultar.textContent = "Consultar"
            })
    })

    atualizar.addEventListener("click", async e => {
        e.preventDefault()

        let id = document.getElementById("id").value

        const valores = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            matricula: matricula.value,
            telefone: telefone.value,
            email: email.value
        }


        await fetch(`http://localhost:8081/aluno/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta ao atualizar o aluno");
                return resp.json()
            })
            .then(aluno => {
                console.log(aluno)
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
    })
}