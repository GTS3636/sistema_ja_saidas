import { insertIntoList } from "../index.js"
export function atualizarSaida() {
    let res = document.getElementById("res")
    let atualizar = document.getElementById("atualizar")

    let statusSaida = document.getElementById("statusSaida")
    let motivo = document.getElementById("motivo")

    statusSaida.disabled = true
    motivo.disabled = true

    let consultar = document.getElementById("consultar")

    let codAluno
    let codProfessor

    let nomeAluno
    let nomeProfessor
    let localDestino

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
            .then(async saida => {
                await fetch("http://localhost:8081/aluno")
                    .then((resp) => {
                        if (!resp.ok)
                            throw new Error("Erro na resposta do servidor ao consultar os alunos")
                        return resp.json()
                    })
                    .then((aluno) => {
                        // Verifica se o aluno existe
                        const alunoExistente = aluno.find(
                            (alu) => `${alu.nome} ${alu.sobrenome}` === saida.nomeAluno
                        )
                        if (!alunoExistente) {
                            throw new Error(`Aluno ${saida.nomeAluno} não encontrado. Por favor, verifique o nome informado.`)
                        } else {
                            codAluno = alunoExistente.codAluno
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar os alunos: ", err)
                        alert(
                            "Erro ao consultar os alunos. Verifique o nome informado e a conexão com o servidor."
                        )
                    })

                await fetch("http://localhost:8081/professor")
                    .then((resp) => {
                        if (!resp.ok)
                            throw new Error("Erro na resposta do servidor ao consultar os professores")
                        return resp.json()
                    })
                    .then((professor) => {
                        // Verifica se o professor existe
                        const professorExistente = professor.find(
                            (prof) => `${prof.nome} ${prof.sobrenome}` === saida.nomeProfessor
                        )
                        if (!professorExistente) {
                            throw new Error(`Professor ${saida.nomeProfessor} não encontrado. Por favor, verifique o nome informado.`)
                        } else {
                            codProfessor = professorExistente.codProfessor
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar os professores: ", err)
                        alert("Erro ao consultar os professores. Verifique o nome informado e a conexão com o servidor.")
                    })


                nomeAluno = saida.nomeAluno
                nomeProfessor = saida.nomeProfessor
                localDestino = saida.localDestino

                statusSaida.value = saida.status ? saida.status : "pendente"
                motivo.value = saida.motivo ? saida.motivo : "Sem motivo aparente"

                res.innerHTML = ``
                res.innerHTML += `
                    <h2>Saída ${idSaida} encontrada!</h2>
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
            nomeAluno: nomeAluno,
            motivo: motivo.value,
            localDestino: localDestino,
            status: statusSaida.value,
            dataSolicitacao: new Date().toISOString().split("T")[0], // "2025-07-09"
            horaSaida: new Date().toLocaleTimeString("pt-BR"),
            horaRetorno: statusSaida.value !== "finalizado" ? null : new Date().toLocaleTimeString("pt-BR"),
            nomeProfessor: nomeProfessor ? nomeProfessor : "Não informado",
            aluno_cod: codAluno,
            professor_cod: codProfessor,
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
                    <h2>Saída ${idSaida} atualizada com sucesso!</h2>
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