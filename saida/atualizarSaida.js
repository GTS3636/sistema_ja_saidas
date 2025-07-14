export function atualizarSaida() {
    let res = document.getElementById("res")
    let atualizar = document.getElementById("atualizar")

    let statusSaida = document.getElementById("statusSaida")
    let motivo = document.getElementById("motivo")

    statusSaida.disabled = true
    motivo.disabled = true

    let consultar = document.getElementById("consultar")

    consultar.addEventListener("click", async e => {
        e.preventDefault()
        res.innerHTML = ``
        res.innerHTML += `<label>Consultando...</label>`

        consultar.innerText = `Consultado...`
        consultar.disabled = true

        let idSaida = document.getElementById("idSaida").value

        await fetch(`http://localhost:8081/saida/${idSaida}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar a saida");
                return resp.json()
            })
            .then(saida => {
                statusSaida.value = saida.status ? saida.status : "pendente"
                motivo.value = saida.motivo ? saida.motivo : "Sem motivo aparente"

                res.innerHTML = ``
                res.innerHTML += `
                    <h2>Saída ${saida.id} encontrada!</h2>
                    <p>Status Atual: ${saida.status}</p>
                    <p>Motivo: ${saida.motivo || "Nenhum"}</p>
                `

                statusSaida.disabled = false
                motivo.disabled = false
            })
            .catch((err) => {
                console.error("Erro ao consultar a saida: ", err)
            })
            .finally(() => {
                consultar.disabled = false
                consultar.innerText = `Consultar Saída`
            })
    })

    atualizar.addEventListener("click", async e => {
        e.preventDefault()

        if (statusSaida.value === "none") {
            alert("Por favor, selecione um status para a saída.")
            return
        }

        atualizar.innerText = `Atualizando...`
        atualizar.disabled = true
        let idSaida = document.getElementById("idSaida").value

        const valores = {
            status: statusSaida.value,
            motivo: motivo.value
        }

        await fetch(`http://localhost:8081/saida/${idSaida}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro na resposta ao atualizar a saida");
                return resp.json()
            })
            .then(saida => {
                res.innerHTML = ``
                res.innerHTML += `
                    <h2>Saída ${saida.id} atualizada com sucesso!</h2>
                    <p>Status Atualizado para: ${saida.status}</p>
                `
            })
            .catch((err) => {
                console.error("Erro ao atualizar a saida: ", err)
            })
            .finally(() => {
                atualizar.innerText = `Atualizar Saída`
                atualizar.disabled = false

                statusSaida.value = "none"
                motivo.value = ""
            })
        insertIntoList()
    })
}