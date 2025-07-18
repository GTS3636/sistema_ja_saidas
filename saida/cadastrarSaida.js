import { insertIntoList } from "../index.js"
export function cadastrarSaida() {
  let res = document.getElementById("res")
  let cadastrar = document.getElementById("cadastrar")
  res.innerHTML = ``

  cadastrar.addEventListener("click", async (e) => {
    e.preventDefault()

    res.innerHTML = `<label>Carregando...</label>`

    cadastrar.disabled = true
    cadastrar.textContent = "Cadastrando Saída..."

    let nomeAluno = document.getElementById("nomeAluno").value
    let nomeProfessor = document.getElementById("nomeProfessor").value
    let motivo = document.getElementById("motivo").value
    let localDestino = document.getElementById("localDestino").value
    let status = "pendente" // Padrão para novas saídas

    let codAluno
    let codProfessor

    await fetch("http://localhost:8081/aluno")
      .then((resp) => {
        if (!resp.ok)
          throw new Error("Erro na resposta do servidor ao consultar os alunos")
        return resp.json()
      })
      .then((aluno) => {
        // Verifica se o aluno existe
        const alunoExistente = aluno.find(
          (alu) => `${alu.nome} ${alu.sobrenome}` === nomeAluno
        );
        if (!alunoExistente) {
          throw new Error(
            `Aluno ${nomeAluno} não encontrado. Por favor, verifique o nome informado.`
          );
        } else {
          codAluno = alunoExistente.codAluno;
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
          (prof) => `${prof.nome} ${prof.sobrenome}` === nomeProfessor
        )
        if (!professorExistente) {
          throw new Error(`Professor ${nomeProfessor} não encontrado. Por favor, verifique o nome informado.`)
        } else {
          codProfessor = professorExistente.codProfessor
        }
      })
      .catch((err) => {
        console.error("Erro ao consultar os professores: ", err)
        alert("Erro ao consultar os professores. Verifique o nome informado e a conexão com o servidor.")
      })

    const valores = {
      nomeAluno: nomeAluno,
      motivo: motivo,
      localDestino: localDestino,
      status: status,
      dataSolicitacao: new Date().toISOString().split("T")[0], // "2025-07-09"
      horaSaida: new Date().toLocaleTimeString("pt-BR"), // "14:30"
      nomeProfessor: nomeProfessor ? nomeProfessor : "Não informado",
      aluno_cod: codAluno,
      professor_cod: codProfessor,
    }

    await fetch("http://localhost:8081/saida", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valores),
    })
      .then((resp) => {
        if (!resp.ok)
          throw new Error(
            "Erro no recebimento dos dados de resposta do cadastro da saida"
          );
        return resp.json()
      })
      .then((saida) => {
        res.innerHTML = ``
        res.innerHTML += `
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Aluno</th>
                        <th>Motivo</th>
                        <th>Local Destino</th>
                        <th>Status</th>
                        <th>Hora Saída</th>
                        <th>Hora Retorno</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${saida.codSaida}</td>
                        <td>${saida.nomeAluno}</td>
                        <td>${saida.motivo}</td>
                        <td>${saida.localDestino}</td>
                        <td>${saida.status}</td>
                        <td>${saida.horaSaida || "Ainda não saiu"}</td>
                        <td>${saida.horaRetorno || "Ainda não retornou"}</td>
                    </tr>
                </tbody>
            </table>
                `
        insertIntoList()
      })
      .catch((err) => {
        console.error("Erro ao enviar os dados ao banco de dados: ", err)
        alert("Erro ao cadastrar a saída. Verifique os dados informados e a conexão com o servidor.")
        res.innerHTML = `<label>Erro ao cadastrar a saída. Verifique os dados informados e a conexão com o servidor.</label>`;
      })
      .finally(() => {
        cadastrar.disabled = false;
        cadastrar.textContent = "Cadastrar Saída";

        // Limpa os campos após o cadastro
        document.getElementById("nomeAluno").value = "";
        document.getElementById("nomeProfessor").value = "";
        document.getElementById("motivo").value = "";
        document.getElementById("localDestino").value = "";
      })
  })
}
