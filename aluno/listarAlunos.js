export async function listarAlunos() {
    let res = document.getElementById("res")

    res.innerHTML = `<label>Listando...</label>`

    await fetch("http://localhost:8081/aluno")
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
                resRelatAlunoText.innerHTML = ``
                dados.forEach(aluno => {
                    let resRelatAlunoText = document.getElementById("resRelatAlunoText")
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
            } else {
                res.innerHTML = `<label>Não há alunos cadastrados.</label>`
                console.warn("Não há alunos cadastrados.")
            }
        })
        .catch((err) => {
            console.error("Erro no recebimento dos dados das saidas: ", err)
            alert("Erro ao listar os alunos. Verifique a conexão com o servidor ou se há alunos cadastrados.")
            res.innerHTML = `<label>Erro ao listar os alunos. Verifique a conexão com o servidor ou se há alunos cadastrados.</label>`
        })
}