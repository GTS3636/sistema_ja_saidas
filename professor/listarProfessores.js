export function listarProfessores() {
    let res = document.getElementById("res")
    res.innerHTML = `<label>Listando...</label>`

    fetch("http://localhost:8081/professor")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta de dados dos professores!")
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
                dados.forEach(professor => {
                    resRelatProfessorText.innerHTML += `
                    <tr>
                        <td>${professor.codProfessor}</td>
                        <td>${professor.nome}</td>
                        <td>${professor.sobrenome}</td>
                        <td>${professor.matricula}</td>
                        <td>${professor.telefone}</td>
                        <td style="overflow-y: auto">${professor.email}</td>
                    </tr>
                `
                })
            } else {
                res.innerHTML = `<label>Não há professores cadastrados.</label>`
            }
        })
        .catch((err) => {
            console.error("Erro no recebimento dos dados dos professores: ", err)
            alert("Erro ao listar os professores. Verifique a conexão com o servidor ou se há professores cadastrados.")
            res.innerHTML = `<label>Erro ao listar os professores. Verifique a conexão com o servidor ou se há professores cadastrados.</label>`
        })
}