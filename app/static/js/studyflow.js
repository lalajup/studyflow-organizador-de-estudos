const formulario = document.getElementById("form-tarefa");
const lista = document.getElementById("lista-tarefas");

// Elementos do formulário de edição
const painelEdicao = document.getElementById("painel-edicao");
const formularioEdicao = document.getElementById("form-edicao");
const cancelarEdicao = document.getElementById("cancelar-edicao");

// Guarda o ID da tarefa que está sendo editada
let tarefaEditando = null;

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

        // Botão de conclusão
        botao.textContent = tarefa.concluida
            ? "Desmarcar conclusão"
            : "Concluir";

        botao.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });
        
        // Botão de edição
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function() {
            iniciarEdicao(tarefa);
        });

        // Botão de exclusão
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
        item.appendChild(botaoEditar);
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

// Abre o formulário e preenche os dados da tarefa
function iniciarEdicao(tarefa) {

    tarefaEditando = tarefa.id;

    document.getElementById("editar-nome").value = tarefa.nome;
    document.getElementById("editar-disciplina").value = tarefa.disciplina;
    document.getElementById("editar-prazo").value = tarefa.prazo;

    painelEdicao.hidden = false;

    painelEdicao.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// Salva as alterações da tarefa
formularioEdicao.addEventListener("submit", async function(event) {
    event.preventDefault();

    if (tarefaEditando === null) {
        return;
    }

    const dados = {
        nome: document.getElementById("editar-nome").value.trim(),
        disciplina: document.getElementById("editar-disciplina").value.trim(),
        prazo: document.getElementById("editar-prazo").value
    };

    try {
        const resposta = await fetch(`/api/tarefas/${tarefaEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao atualizar tarefa.");
        }

        alert("Tarefa atualizada com sucesso!");

        cancelarEdicaoFormulario();

        await carregarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
});

// Cancela a edição
function cancelarEdicaoFormulario() {

    tarefaEditando = null;

    formularioEdicao.reset();

    painelEdicao.hidden = true;
}

// Evento do botão cancelar
cancelarEdicao.addEventListener("click", function() {
    cancelarEdicaoFormulario();
});

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

// Exclui uma tarefa
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

// Carrega as tarefas aasim que a página abrir
carregarTarefas();