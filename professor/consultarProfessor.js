export function consultarProfessor() {
    let res = document.getElementById("res")

    let consultarProfessor = document.getElementById("consultarProfessor")

    res.innerHTML = ``

    consultarProfessor.addEventListener("click", async e => {
        e.preventDefault()

        let id = document.getElementById("id").value

        if (!id || isNaN(id) || id <= 0 || undefined || null) {
            alert("Por favor, informe o ID do professor.")
            return
        }

        consultarProfessor.disabled = true
        consultarProfessor.textContent = "Consultando..."

        res.innerHTML += `<label>Consultando...</label>`

        await fetch(`http://localhost:8081/professor/${id}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar o professor");
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
                console.error("Erro ao consultar o professor: ", err)
                alert("Erro ao consultar o professor. Verifique o ID informado.")
                res.innerHTML = `<label>Erro ao consultar o professor. Verifique o ID informado.</label>`
            })
            .finally(() => {
                consultarProfessor.disabled = false
                consultarProfessor.textContent = "Consultar"
            })
    })
}