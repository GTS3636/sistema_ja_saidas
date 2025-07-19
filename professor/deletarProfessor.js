export function deletarProfessor() {
    let res = document.getElementById("res")
    let deletarProfessor = document.getElementById("deletar")

    deletarProfessor.addEventListener("click", e => {
        e.preventDefault()

        deletarProfessor.disabled = true
        deletarProfessor.textContent = "Deletando..."
        res.innerHTML = `<label>Deletando...</label>`

        let id = document.getElementById("idProfessor").value

        fetch(`http://localhost:8081/professor/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                res.innerHTML = ``
                res.innerHTML += `
                    <label>Professor com o Cod: ${id} deletado com sucesso!</label>
                `
            })
            .catch((err) => {
                console.error("Erro ao deletar o professor: ", err)
                alert("Erro ao deletar o professor. Verifique o ID informado e a conexão com o servidor.")
            })
            .finally(() => {
                deletarProfessor.disabled = false
                deletarProfessor.textContent = "Deletar"
            })
    })
}