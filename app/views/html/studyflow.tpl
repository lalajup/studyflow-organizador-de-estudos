<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>StudyFlow | Organizador de Estudos</title>

    <link rel="stylesheet" href="/static/css/studyflow.css">
</head>

<body>

    <aside class="sidebar">
        <h2>StudyFlow</h2>

        <nav>
            <a href="#inicio">Início</a>
            <a href="#tarefas">Minhas tarefas</a>
            <a href="#progresso">Meu progresso</a>
        </nav>
    </aside>

    <main class="content">

        <header class="topbar">
            <div>
                <h1>Meu painel de estudos</h1>
                <p>Organize sua rotina e alcance seus objetivos!</p>
            </div>
        </header>

        <section class="cards" id="inicio">

            <div class="card">
                <h3>Total de tarefas</h3>
                <p id="total-tarefas">0</p>
            </div>

            <div class="card">
                <h3>Concluídas</h3>
                <p id="tarefas-concluidas">0</p>
            </div>

            <div class="card">
                <h3>Pendentes</h3>
                <p id="tarefas-pendentes">0</p>
            </div>

        </section>

        <section class="panel" id="tarefas">

            <h2>Adicionar nova tarefa</h2>

            <form id="form-tarefa">

                <input
                    type="text"
                    id="nome-tarefa"
                    placeholder="Nome da tarefa"
                    required
                >

                <input
                    type="text"
                    id="disciplina"
                    placeholder="Disciplina"
                    required
                >

                <input
                    type="date"
                    id="prazo"
                    required
                >

                <button type="submit">Adicionar tarefa</button>

            </form>

        </section>

        <section class="panel">

            <h2>Minhas atividades</h2>

            <div id="lista-tarefas">
                <p>Nenhuma tarefa cadastrada.</p>
            </div>

        </section>

        <section class="panel" id="progresso">

            <h2>Meu progresso</h2>

            <div class="progress-container">
                <div id="barra-progresso"></div>
            </div>

            <p id="texto-progresso">0% concluído</p>

        </section>

    </main>

    <script src="/static/js/studyflow.js"></script>

</body>
</html>