export function deletarAluno() {
    let res = document.getElementById("res")
    let deletar = document.getElementById("deletar")

    deletar.addEventListener("click", e => {
        e.preventDefault()

        deletar.disabled = true
        deletar.textContent = "Deletando..."
        res.innerHTML = `<label>Deletando...</label>`

        let id = document.getElementById("id").value

        fetch(`http://localhost:8081/aluno/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                res.innerHTML = ``
                res.innerHTML += `
                    <label>Aluno com o Cod: ${id} deletado com sucesso!</label>
                `
            })
            .catch((err) => {
                console.error("Erro ao deletar o aluno: ", err)
                alert("Erro ao deletar o aluno. Verifique o ID informado e a conexão com o servidor.")
            })
            .finally(() => {
                deletar.disabled = false
                deletar.textContent = "Deletar"
            })
    })
}