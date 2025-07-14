import { insertIntoList } from "../index.js";
export function deletarSaida() {
    let res = document.getElementById("res")
    let deletarSaida = document.getElementById("deletarSaida")

    deletarSaida.addEventListener("click", async e => {
        e.preventDefault()

        res.innerHTML = ``
        res.innerHTML += `<label>Deletando...</label>`

        deletarSaida.disabled = true
        deletarSaida.textContent = "Deletando Saída..."

        let idSaida = document.getElementById("idSaida").value

        await fetch(`http://localhost:8081/saida/${idSaida}`, {
            method: "DELETE"
        })
            .then(() => {
                res.innerHTML = ``
                res.innerHTML += `
                    <br><br><label>Saída ${idSaida} deletada com sucesso!</label>
                `
            })
            .catch((err) => {
                console.error("Erro ao deletar a saida: ", err)
                alert("Erro ao deletar a saída. Verifique o ID informado.")
            })
            .finally(() => {
                deletarSaida.disabled = false
                deletarSaida.textContent = "Deletar Saída"
            })
        insertIntoList()
    })
}