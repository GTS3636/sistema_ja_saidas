export function cadastrarProfessor() {
    let res = document.getElementById("res")
    let cadastrarProfessor = document.getElementById("cadastrar")

    cadastrarProfessor.addEventListener("click", async e => {
        e.preventDefault()

        cadastrarProfessor.disabled = true
        cadastrarProfessor.textContent = "Cadastrando Professor..."
        res.innerHTML = `<label>Carregando...</label>`

        let nome = document.getElementById("nomeProfessor").value
        let sobrenome = document.getElementById("sobrenomeProfessor").value
        let matricula = document.getElementById("matriculaProfessor").value
        let telefone = document.getElementById("telefoneProfessor").value
        let email = document.getElementById("emailProfessor").value

        const valores = {
            nome: nome,
            sobrenome: sobrenome,
            matricula: matricula,
            telefone: telefone,
            email: email
        }

        await fetch("http://localhost:8081/professor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro no recebimento dos dados de resposta do cadastro do professor")
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

                    </tbody>
                </table>
            `
                let resRelatProfessorText = document.getElementById("resRelatProfessorText")
                resRelatProfessorText.innerHTML = ``
                resRelatProfessorText.innerHTML += `
                    <tr>
                        <td>${professor.codProfessor}</td>
                        <td>${professor.nome}</td>
                        <td>${professor.sobrenome}</td>
                        <td>${professor.matricula}</td>
                        <td>${professor.telefone}</td>
                        <td>${professor.email}</td>
                `
            })
            .catch((err) => {
                console.error("Erro ao enviar os dados ao banco de dados: ", err)
                alert("Erro ao cadastrar o professor. Verifique os dados informados e a conexão com o servidor.")
                res.innerHTML = `<label>Erro ao cadastrar o professor. Verifique os dados informados e a conexão com o servidor.</label>`
            })
            .finally(() => {
                cadastrarProfessor.disabled = false
                cadastrarProfessor.textContent = "Cadastrar Professor"

                // Limpa os campos após o cadastro
                document.getElementById("nomeProfessor").value = ""
                document.getElementById("sobrenomeProfessor").value = ""
                document.getElementById("matriculaProfessor").value = ""
                document.getElementById("telefoneProfessor").value = ""
                document.getElementById("emailProfessor").value = ""
            })
    })
}