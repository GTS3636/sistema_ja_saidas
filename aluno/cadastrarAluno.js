export function cadastrarAluno() {
    let res = document.getElementById("res")
    let cadastrar = document.getElementById("cadastrar")
    cadastrar.addEventListener("click", async e => {
        e.preventDefault()

        cadastrar.disabled = true
        cadastrar.textContent = "Cadastrando Aluno..."
        res.innerHTML = `<label>Carregando...</label>`

        let nome = document.getElementById("primeiroNomeALuno")
        let sobrenome = document.getElementById("segundoNomeALuno")
        let matricula = document.getElementById("matriculaAluno")
        let telefone = document.getElementById("telefoneAluno")
        let email = document.getElementById("emailAluno")

        if (!nome.value || !sobrenome.value || !matricula.value || !telefone.value || !email.value) {
            alert("Por favor, preencha todos os campos.")
            cadastrar.disabled = false
            cadastrar.textContent = "Cadastrar"
            return
        }

        const valores = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            matricula: matricula.value,
            telefone: telefone.value,
            email: email.value
        }

        await fetch("http://localhost:8081/aluno", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro no recebimento dos dados de resposta do cadastro do aluno")
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

                    </tbody>
                </table>
            `
                let resRelatAlunoText = document.getElementById("resRelatAlunoText")
                resRelatAlunoText.innerHTML = ``
                resRelatAlunoText.innerHTML += `
                    <tr>
                        <td>${aluno.codAluno}</td>
                        <td>${aluno.nome} ${aluno.sobrenome}</td>
                        <td>${aluno.matricula}</td>
                        <td>${aluno.telefone}</td>
                        <td>${aluno.email}</td>
                    </tr>
                `
            })
            .catch((err) => {
                console.error("Erro ao enviar os dados ao banco de dados: ", err)
            })
            .finally(() => {
                cadastrar.disabled = false
                cadastrar.textContent = "Cadastrar"
                // Limpa os campos após o cadastro
                nome.value = ""
                sobrenome.value = ""
                matricula.value = ""
                telefone.value = ""
                email.value = ""
            })
    })
}