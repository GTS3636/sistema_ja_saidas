export function atualizarProfessor() {
    let res = document.getElementById("res")
    let consultarProfessor = document.getElementById("consultarProfessor")
    let atualizarProfessor = document.getElementById("atualizarProfessor")

    let nome = document.getElementById("nomeProfessor")
    let sobrenome = document.getElementById("sobrenomeProfessor")
    let matricula = document.getElementById("matriculaProfessor")
    let telefone = document.getElementById("telefoneProfessor")
    let email = document.getElementById("emailProfessor")

    nome.disabled = true
    sobrenome.disabled = true
    matricula.disabled = true
    telefone.disabled = true
    email.disabled = true

    consultarProfessor.addEventListener("click", async e => {
        e.preventDefault()

        res.innerHTML = `<label>Consultando...</label>`
        consultarProfessor.disabled = true
        consultarProfessor.textContent = "Consultando Professor..."

        nome.disabled = false
        sobrenome.disabled = false
        matricula.disabled = false
        telefone.disabled = false
        email.disabled = false

        let id = document.getElementById("idProfessor").value
        await fetch(`http://localhost:8081/professor/${id}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar o professor");
                return resp.json()
            })
            .then(professor => {
                nome.value = professor.nome
                sobrenome.value = professor.sobrenome
                matricula.value = professor.matricula
                telefone.value = professor.telefone
                email.value = professor.email

                res.innerHTML = ``
                res.innerHTML += `
                    <table border="1">
                        <thead>
                            <tr>
                                <th>COD</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Matricula</th>
                                <th>Telefone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody id="resRelatProfessorText">
                            <tr>
                                <td>${professor.codProfessor}</td>
                                <td>${professor.nome}</td>
                                <td>${professor.sobrenome}</td>
                                <td>${professor.matricula}</td>
                                <td>${professor.telefone}</td>
                                <td>${professor.email}</td>
                            </tr>
                        </tbody>
                    </table>
                `

            })
            .catch((err) => {
                console.error("Erro ao consultar o professor: ", err)
                alert("Erro ao consultar o professor. Verifique o ID informado.")
                res.innerHTML = `<label>Erro ao consultar o professor. Verifique o ID informado.</label>`
            })
            .finally(() => {
                consultarProfessor.disabled = false
                consultarProfessor.textContent = "Consultar"
            })
    })

    atualizarProfessor.addEventListener("click", async e => {
        e.preventDefault()

        let id = document.getElementById("idProfessor").value

        const valores = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            matricula: matricula.value,
            telefone: telefone.value,
            email: email.value
        }

        await fetch(`http://localhost:8081/professor/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta ao atualizar o professor");
                return resp.json()
            })
            .then(professor => {
                res.innerHTML = ``
                res.innerHTML += `
                    <table border="1">
                        <thead>
                            <tr>
                                <th>COD</th>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Matricula</th>
                                <th>Telefone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody id="resRelatProfessorText">
                            <tr>
                                <td>${professor.codProfessor}</td>
                                <td>${professor.nome}</td>
                                <td>${professor.sobrenome}</td>
                                <td>${professor.matricula}</td>
                                <td>${professor.telefone}</td>
                                <td>${professor.email}</td>
                            </tr>
                        </tbody>
                    </table>
                `
            })
            .catch((err) => {
                console.error("Erro ao atualizar o professor: ", err)
                alert("Erro ao atualizar o professor. Verifique os dados informados e a conexão com o servidor.")
                res.innerHTML = `<label>Erro ao atualizar o professor. Verifique os dados informados e a conexão com o servidor.</label>`
            })
    })
}