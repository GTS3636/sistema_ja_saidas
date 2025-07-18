import { cadastrarAluno } from "./aluno/cadastrarAluno.js"
import { cadastrarProfessor } from "./professor/cadastrarProfessores.js"
import { cadastrarSaida } from "./saida/cadastrarSaida.js"

import { consultarAluno } from "./aluno/consultarAluno.js"
import { consultarProfessor } from "./professor/consultarProfessor.js"
import { consultarSaida } from "./saida/consultarSaida.js"

import { atualizarAluno } from "./aluno/atualizarAluno.js"
import { atualizarProfessor } from "./professor/atualizarProfessor.js"
import { atualizarSaida } from "./saida/atualizarSaida.js"

import { deletarAluno } from "./aluno/deletarAluno.js"
import { deletarProfessor } from "./professor/deletarProfessor.js"
import { deletarSaida } from "./saida/deletarSaida.js"

import { listarAlunos } from "./aluno/listarAlunos.js"
import { listarProfessores } from "./professor/listarProfessores.js"
import { listarSaidas } from "./saida/listarSaida.js"

function controleMenu() {
    let selectionServices = document.getElementById("selectionServices")
    let selectionPages = document.getElementById("selectionPages")
    let dynamicMenu = document.getElementById("card")

    function writeWelcomingMessage() {
        dynamicMenu.innerHTML = `<h2>Bem vindo!</h2>
              <p>Selecione uma das opções de serviços conforme a necessidade de gerenciamento.<span></span></p>
              <p>Esse é um sistema de gerenciamento de saídas feitas por alunos e gerenciadas pelos professores. Aqui, você vai poder controlar as entradas e saídas, o tempo que o aluno ficou fora de sala, o motivo da saída, local, data, dentre outras funcionalidades.<span></span></p>`
    }
    writeWelcomingMessage()

    selectionPages.addEventListener("change", (e) => {
        e.preventDefault()

        selectionServices.value = "none"

        let service = selectionServices.value
        let page = selectionPages.value

        if (page == "none" || service == "none") {
            writeWelcomingMessage()
        }
    })

    selectionServices.addEventListener("change", (e) => {
        e.preventDefault()
        dynamicMenu.innerHTML = ""

        let service = selectionServices.value
        let page = selectionPages.value

        // ----------------------------------------------
        // Aba para escolha de serviços com base no aluno
        // ----------------------------------------------

        if (service == "none" || page == "none") {
            writeWelcomingMessage()
        }

        if (page == "aluno" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
            <h2>Cadastrar Aluno</h2><br>
            <label for="primeiroNomeALuno">Digite o primeiro nome do aluno: </label><br>
            <input type="text" id="primeiroNomeALuno" placeholder="Primeiro nome do aluno..." required><br><br>
            
            <label for="segundoNomeALuno">Digite o segundo nome do aluno: </label><br>
            <input type="text" id="segundoNomeALuno" placeholder="Segundo nome do aluno..." required><br><br>
            
            <label for="matriculaAluno">Digite a matricula do aluno: </label><br>
            <input type="number" id="matriculaAluno" placeholder="Matriucla do aluno..." required><br><br>

            <label for="telefoneAluno">Digite o telefone do aluno: </label><br>
            <input type="tel" id="telefoneAluno" placeholder="Telefone do aluno..." required><br><br>
            
            <label for="emailAluno">Digite o email do aluno: </label><br>
            <input type="email" id="emailAluno" placeholder="Email do aluno..." required><br><br>

            <button id="cadastrar">Cadastrar</button>
            <div id="res"></div>
            `
            cadastrarAluno()
        }

        if (page == "aluno" && service == "listar") {
            dynamicMenu.innerHTML = `
            <h2>Listagem</h2><br><br>
            <div id="res"></div>
            `
            listarAlunos()
        }

        if (page == "aluno" && service == "atualizar") {
            dynamicMenu.innerHTML = `
            <h2>Atualizar Aluno</h2><br><br><hr>
            <label for="id">Digite o ID do aluno: </label><br>
            <input type="text" id="id" placeholder="ID do aluno..." required><br><br>
            
            <label for="primeiroNomeALuno">Digite o primeiro nome do aluno: </label><br>
            <input type="text" id="primeiroNomeALuno" placeholder="Primeiro nome do aluno..."><br><br>
            
            <label for="segundoNomeALuno">Digite o segundo nome do aluno: </label><br>
            <input type="text" id="segundoNomeALuno" placeholder="Segundo nome do aluno..."><br><br>
            
            <label for="matriculaAluno">Digite a matricula do aluno: </label><br>
            <input type="number" id="matriculaAluno" placeholder="Turma do aluno..."><br><br>

            <label for="telefoneAluno">Digite o telefone do aluno: </label><br>
            <input type="tel" id="telefoneAluno" placeholder="Telefone do aluno..."><br><br>
            
            <label for="emailAluno">Digite o email do aluno: </label><br>
            <input type="email" id="emailAluno" placeholder="Email do aluno..."><br><br>

            <button id="consultar">Consultar</button>
            <button id="atualizar">Atualizar</button><br><br>
            <div id="res"></div>
            `
            atualizarAluno()
        }

        if (page == "aluno" && service == "deletar") {
            dynamicMenu.innerHTML = `
            <h2>Deletar Aluno</h2><br><br>
            <label for="id">Digite o COD do aluno: </label><br>
            <input type="text" id="id" placeholder="ID do aluno..." required><br><br>
            <button id="deletar">Deletar</button><br><br>
            <div id="res"></div>
            `
            deletarAluno()
        }

        if (page == "aluno" && service == "consultar") {
            dynamicMenu.innerHTML = `
            <h2>Consultar</h2><br><br>
            <label for="id">Digite o ID do aluno: </label><br><br>
            <input type="text" id="id" placeholder="ID do aluno..." required><br><br>
            <button id="consultar">Consultar</button><br><br>
            <div id="res"></div>
            `
            consultarAluno()
        }

        // ----------------------------------------------
        // Aba para escolha de serviços com base na saída
        // ----------------------------------------------

        if (page == "saida" && service == "listar") {
            dynamicMenu.innerHTML = `
            <h2>Listagem de Saídas</h2>
            <div id="res"></div>
            `
            listarSaidas()
        }

        if (page == "saida" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
            <h2>Cadastrar Saída</h2><br>
            <label for="nomeAluno">Nome do Aluno: </label><br>
            <input type="text" id="nomeAluno" placeholder="Nome do aluno..." required><br><br>

            <label for="nomeProfessor">Nome do Professor: </label><br>
            <input type="text" id="nomeProfessor" placeholder="Nome do professor..." required><br><br>

            <label for="motivo">Motivo da Saída: </label><br>
            <input type="text" id="motivo" placeholder="Motivo da saída..." required><br><br>

            <label for="localDestino">Local de Destino: </label><br>
            <input type="text" id="localDestino" placeholder="Local de destino..." required><br><br>

            <button id="cadastrar">Cadastrar Saída</button><br><br>
            <div id="res"></div>
            `
            cadastrarSaida()
        }

        if (page == "saida" && service == "atualizar") {
            dynamicMenu.innerHTML = `
            <h2>Atualizar Saída</h2><br>
            <label for="idSaida">ID da Saída: </label><br>
            <input type="text" id="idSaida" placeholder="ID da saída..." required><br><br>

            <label for="statusSaida">Status da Saída: </label><br>
            <select id="statusSaida">
                <option value="none">Selecione uma opção...</option>
                <option value="pendente">Pendente</option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="finalizado">Finalizado</option>
            </select><br><br>
            <label for="motivo">Motivo (opcional): </label><br>
            <input type="text" id="motivo" placeholder="Motivo da atualização..."><br><br>

            <button id="consultar">Consultar Saída</button>
            <button id="atualizar">Atualizar Saída</button>
            <div id="res"></div>
            `
            atualizarSaida()
        }

        if (page == "saida" && service == "deletar") {
            dynamicMenu.innerHTML = `
            <h2>Deletar Saída</h2><br>
            <label for="idSaida">ID da Saída: </label><br>
            <input type="text" id="idSaida" placeholder="ID da saída..." required><br><br>

            <button id="deletarSaida">Deletar Saída</button>
            <div id="res"></div>
            `
            deletarSaida()
        }

        if (page == "saida" && service == "consultar") {
            dynamicMenu.innerHTML = `
            <h2>Consultar Saída</h2>
            <label for="idSaida">ID da Saída: </label><br>
            <input type="text" id="idSaida" placeholder="ID da saída..." required><br><br>

            <button id="consultarSaida">Consultar Saída</button>
            <div id="res"></div>
            `
            consultarSaida()
        }

        // --------------------------------------------------
        // Aba para escolha de serviços com base no professor
        // --------------------------------------------------

        if (page == "professor" && service == "listar") {
            dynamicMenu.innerHTML = `
            <h2>Listagem de Professores</h2>
            <div id="res"></div>
            `
            listarProfessores()
        }

        if (page == "professor" && service == "cadastrar") {
            dynamicMenu.innerHTML = `
            <h2>Cadastrar Professor</h2><br>
            <label for="nomeProfessor">Nome do Professor: </label><br>
            <input type="text" id="nomeProfessor" placeholder="Nome do professor..." required><br><br>

            <label for="sobrenomeProfessor">Sobrenome do Professor: </label><br>
            <input type="text" id="sobrenomeProfessor" placeholder="Sobrenome do professor..." required><br><br>

            <label for="matriculaProfessor">Matricula do Professor: </label><br>
            <input type="number" id="matriculaProfessor" placeholder="Matricula do professor..." required><br><br>

            <label for="telefoneProfessor">Telefone do Professor: </label><br>
            <input type="tel" id="telefoneProfessor" placeholder="Telefone do professor..." required><br><br>

            <label for="emailProfessor">Email do Professor: </label><br>
            <input type="email" id="emailProfessor" placeholder="Email do professor..." required><br><br>

            <button id="cadastrarProfessor">Cadastrar</button>
            <div id="res"></div>
            `
            cadastrarProfessor()
        }

        if (page == "professor" && service == "atualizar") {
            dynamicMenu.innerHTML = `
            <h2>Atualizar Professor</h2><br>
            <label for="idProfessor">ID do Professor: </label><br>
            <input type="text" id="idProfessor" placeholder="ID do professor..." required><br><br>

            <label for="nomeProfessor">Nome do Professor: </label><br>
            <input type="text" id="nomeProfessor" placeholder="Nome do professor..."><br><br>

            <label for="sobrenomeProfessor">Sobrenome do Professor: </label><br>
            <input type="text" id="sobrenomeProfessor" placeholder="Sobrenome do professor..."><br><br>

            <label for="matriculaProfessor">Matricula do Professor: </label><br>
            <input type="number" id="matriculaProfessor" placeholder="Matricula do professor..."><br><br>

            <label for="telefoneProfessor">Telefone do Professor: </label><br>
            <input type="tel" id="telefoneProfessor" placeholder="Telefone do professor..."><br><br>

            <label for="emailProfessor">Email do Professor: </label><br>
            <input type="email" id="emailProfessor" placeholder="Email do professor..."><br><br>

            <button id="consultarProfessor">Consultar</button>
            <button id="atualizarProfessor">Atualizar</button>
            <div id="res"></div>
            `
            atualizarProfessor()
        }

        if (page == "professor" && service == "deletar") {
            dynamicMenu.innerHTML = `
            <h2>Deletar Professor</h2>
            <label for="idProfessor">ID do Professor: </label><br>
            <input type="text" id="idProfessor" placeholder="ID do professor..." required><br><br>

            <button id="deletarProfessor">Deletar</button>
            <div id="res"></div>
            `
            deletarProfessor()
        }

        if (page == "professor" && service == "consultar") {
            dynamicMenu.innerHTML = `
            <h2>Consultar Professor</h2>
            <label for="idProfessor">ID do Professor: </label><br>
            <input type="text" id="idProfessor" placeholder="ID do professor..." required><br><br>

            <button id="consultarProfessor">Consultar</button>
            <div id="res"></div>
            `
            consultarProfessor()
        }
    })
}
controleMenu()

const lista = document.getElementById('sidebarList')
lista.addEventListener('click', async e => {
    e.preventDefault();
    if (!e.target.matches('button[data-action]')) return;

    const btn = e.target
    const li = btn.closest('li')
    const saidaId = li.dataset.id
    const codAluno = li.dataset.codAluno
    const codProfessor = li.dataset.codProfessor

    let horaSaida = li.dataset.horaSaida
    let horaRetorno = li.dataset.horaRetorno
    const motivo = li.dataset.motivo
    const localDestino = li.dataset.localDestino
    const nomeAluno = li.dataset.nomeAluno
    const nomeProfessor = li.dataset.nomeProfessor
    const dataSolicitacao = li.dataset.dataSolicitacao

    let action = btn.dataset.action // "aprovar" | "reprovar" | "retorno"

    switch (action) {
        case 'aprovar': {
            let horaSaida = new Date().toISOString().split('T')[1].split('.')[0];
            return enviarSaida({
                horaSaida: horaSaida,
                status: "aprovado",
                aluno_cod: Number(codAluno),
                professor_cod: Number(codProfessor),
                horaSaida: horaSaida = new Date().toLocaleTimeString("pt-BR"),
                horaRetorno: horaRetorno && horaRetorno !== "null" ? horaRetorno : null,
                motivo: motivo,
                localDestino: localDestino,
                nomeAluno: nomeAluno,
                nomeProfessor: nomeProfessor,
                dataSolicitacao: dataSolicitacao
            })
        }
        case 'reprovar': {
            enviarSaida({
                status: "reprovado",
                aluno_cod: Number(codAluno),
                professor_cod: Number(codProfessor),
                motivo: motivo,
                localDestino: localDestino,
                nomeAluno: nomeAluno,
                nomeProfessor: nomeProfessor,
                dataSolicitacao: dataSolicitacao
            })
            lista.querySelectorAll("li").forEach(li => { if (li.dataset.id === saidaId) li.remove() })
            return
        }
        case 'retorno': {
            const horaRetorno = new Date().toLocaleTimeString("pt-BR")
            enviarSaida({
                horaRetorno: horaRetorno,
                status: "finalizado",
                aluno_cod: Number(codAluno),
                professor_cod: Number(codProfessor),
                horaSaida: horaSaida,
                horaRetorno: horaRetorno && horaRetorno !== "null" ? horaRetorno : null,
                motivo: motivo,
                localDestino: localDestino,
                nomeAluno: nomeAluno,
                nomeProfessor: nomeProfessor,
                dataSolicitacao: dataSolicitacao
            })
            return
        }
        default:
            return
    }

    async function enviarSaida(valores) {
        lista.innerHTML = `<li>Atualizando...</li>`;

        if (action === "aprovar") {
            action = "aprovado(a)"
        } else if (action === "reprovar") {
            action = "reprovado(a)"
        } else if (action === "retorno") {
            action = "retornou"
        }

        try {
            const resp = await fetch(`http://localhost:8081/saida/${saidaId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(valores)
            })
            if (!resp.ok) throw new Error('Falha na resposta da atualização!')
            const data = await resp.json()
            alert(`Aluno ${data.nomeAluno} (cod ${saidaId}) ${action} com sucesso!`)
        } catch (err) {
            console.error(err)
            alert("Erro ao atualizar. Verifique a conexão ou se há saídas cadastradas.")
        }
        insertIntoList()
    }
})

export async function insertIntoList() {
    const lista = document.getElementById('sidebarList')
    let num = 1
    let codAluno
    let codProfessor

    await fetch("http://localhost:8081/saida")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta de dados das saidas!")
            }
            return resp.json()
        })
        .then(dados => {
            lista.querySelectorAll('li').forEach(li => li.remove())
            if ((dados.length > 0) && (dados.find(saida => saida.status === "pendente" || saida.status === "aprovado"))) {
                dados.forEach(async saida => {
                    // só percorre se for pendente ou aprovado
                    if (saida.status === "pendente" || saida.status === "aprovado") {
                        const li = document.createElement('li')
                        li.dataset.id = saida.codSaida

                        await fetch("http://localhost:8081/aluno")
                            .then(resp => {
                                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar os alunos");
                                return resp.json()
                            })
                            .then(aluno => {
                                // Verifica se o aluno existe
                                const alunoExistente = aluno.find(alu => `${alu.nome} ${alu.sobrenome}` === saida.nomeAluno)
                                if (!alunoExistente) {
                                    throw new Error(`Aluno ${saida.nomeAluno} não encontrado. Por favor, verifique o nome informado.`)
                                } else {
                                    codAluno = alunoExistente.codAluno
                                }
                            })
                            .catch((err) => {
                                console.error("Erro ao consultar os alunos: ", err)
                                alert("Erro ao consultar os alunos. Verifique o nome informado e a conexão com o servidor.")
                            })

                        await fetch("http://localhost:8081/professor")
                            .then(resp => {
                                if (!resp.ok) throw new Error("Erro na resposta do servidor ao consultar os professores")
                                return resp.json()
                            })
                            .then(professor => {
                                // Verifica se o professor existe
                                const professorExistente = professor.find(prof => `${prof.nome} ${prof.sobrenome}` === saida.nomeProfessor)
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

                        li.dataset.dataSolicitacao = saida.dataSolicitacao
                        li.dataset.codAluno = codAluno
                        li.dataset.codProfessor = codProfessor
                        li.dataset.horaSaida = saida.horaSaida
                        li.dataset.horaRetorno = saida.horaRetorno
                        li.dataset.motivo = saida.motivo
                        li.dataset.localDestino = saida.localDestino
                        li.dataset.nomeAluno = saida.nomeAluno
                        li.dataset.nomeProfessor = saida.nomeProfessor

                        if (saida.status === "aprovado") {
                            li.innerHTML = `
                                ${num} - ${saida.nomeAluno} |
                                <button data-action="retorno">Retorno</button><br>
                                <small class="statusAprovado">Status: Aprovado</small>
                                <small>Aprovado por: ${saida.nomeProfessor}</small>
                              `
                        } else { // só sobra "pendente"
                            li.innerHTML = `
                                ${num} - ${saida.nomeAluno} |
                                <button data-action="aprovar">Aprovar</button>
                                <button data-action="reprovar">Reprovar</button><br>
                                <small class="statusPendente">Status: Pendente</small><br>
                                <small>Motivo: ${saida.motivo}</small><br>
                                <small>Local: ${saida.localDestino}</small><br>
                                <small>Hora Pedido: ${saida.horaSaida || "Ainda não saiu"}</small>
                            `
                        }
                        lista.appendChild(li)
                    }
                })
            } else if (!dados.find(saida => saida.status === "pendente" || saida.status === "aprovado")) {
                lista.innerHTML += "<li>Sem saídas no momento...</li>"
            }
        })
        .catch((err) => {
            console.error("Erro no recebimento dos dados das saidas: ", err)
        })
}

insertIntoList()
const intervalId = setInterval(async () => {
    try {
        await insertIntoList()
    } catch (err) {
        console.error("Falha ao atualizar lista:", err)
    }
}, 30000)

clearInterval(intervalId)