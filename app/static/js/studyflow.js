const formulario = document.getElementById("form-tarefa");
const lista = document.getElementById("lista-tarefas");

// Busca as tarefas armazenadas no Python
async function carregarTarefas() {
    try {
        const resposta = await fetch("/api/tarefas");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as tarefas.");
        }

        const tarefas = await resposta.json();

        atualizarPainel(tarefas);

    } catch (erro) {
        console.error(erro);
        lista.textContent = "Erro ao carregar as tarefas.";
    }
}

// Cadastra uma nova tarefa
formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const dados = {
        nome: document.getElementById("nome-tarefa").value.trim(),
        disciplina: document.getElementById("disciplina").value.trim(),
        prazo: document.getElementById("prazo").value
    };

    try {
        const resposta = await fetch("/api/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao cadastrar tarefa.");
        }

        formulario.reset();

        await carregarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
});

// Exibe as tarefas na página
function atualizarPainel(tarefas) {

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
    }

    tarefas.forEach(function(tarefa) {

        const item = document.createElement("div");
        const titulo = document.createElement("h3");
        const disciplina = document.createElement("p");
        const prazo = document.createElement("p");
        const botao = document.createElement("button");
        const separador = document.createElement("hr");

        titulo.textContent = tarefa.nome;
        disciplina.textContent = "Disciplina: " + tarefa.disciplina;
        prazo.textContent = "Prazo: " + tarefa.prazo;

        botao.textContent = tarefa.concluida
            ? "Desmarcar conclusão"
            : "Concluir";

        botao.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });
        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.style.backgroundColor = "#dc3545";
        botaoExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        item.appendChild(titulo);
        item.appendChild(disciplina);
        item.appendChild(prazo);
        item.appendChild(botao);
        item.appendChild(botaoExcluir);
        item.appendChild(separador);

        lista.appendChild(item);
    });

    // Calcula os indicadores
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    const progresso = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("total-tarefas").textContent = total;

    document.getElementById("tarefas-concluidas").textContent = concluidas;

    document.getElementById("tarefas-pendentes").textContent = pendentes;

    document.getElementById("barra-progresso").style.width =
        progresso + "%";

    document.getElementById("texto-progresso").textContent =
        progresso + "% concluído";
}

// Alterna a conclusão de uma tarefa
async function concluirTarefa(id) {

    try {
        const resposta = await fetch(
            `/api/tarefas/${id}/concluir`,
            {
                method: "POST"
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao atualizar tarefa.");
        }

        await carregarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

async function excluirTarefa(id) {

    const confirmar = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`/api/tarefas/${id}`, {
            method: "DELETE"
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao excluir tarefa.");
        }

        await carregarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Carrega as tarefas assim que a página abrir
carregarTarefas();