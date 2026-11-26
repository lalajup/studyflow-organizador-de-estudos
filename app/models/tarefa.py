import json
from pathlib import Path


class TarefaModel:

    def __init__(self):
        # Define onde as tarefas serão armazenadas
        self.arquivo = Path(__file__).resolve().parent / "tarefas.json"

    def listar(self):
        # Verifica se o arquivo já existe
        if not self.arquivo.exists():
            return []

        # Lê as tarefas armazenadas
        with open(self.arquivo, "r", encoding="utf-8") as arquivo:
            return json.load(arquivo)

    def salvar(self, tarefas):
        # Salva as tarefas no arquivo JSON
        with open(self.arquivo, "w", encoding="utf-8") as arquivo:
            json.dump(tarefas, arquivo, ensure_ascii=False, indent=4)

    def adicionar(self, nome, disciplina, prazo):
        # Recupera as tarefas existentes
        tarefas = self.listar()

        # Cria uma nova tarefa
        nova_tarefa = {
            "id": max([t["id"] for t in tarefas], default=0) + 1,
            "nome": nome,
            "disciplina": disciplina,
            "prazo": prazo,
            "concluida": False
        }

        # Adiciona e salva a tarefa
        tarefas.append(nova_tarefa)
        self.salvar(tarefas)

        return nova_tarefa

    def alternar_conclusao(self, tarefa_id):
        # Recupera as tarefas
        tarefas = self.listar()

        # Procura a tarefa pelo identificador
        for tarefa in tarefas:
            if tarefa["id"] == tarefa_id:

                # Inverte o estado de conclusão
                tarefa["concluida"] = not tarefa["concluida"]

                self.salvar(tarefas)

                return tarefa

        return None
    
    def excluir(self, tarefa_id):
        # Recupera todas as tarefas
        tarefas = self.listar()

        # Remove a tarefa com o ID informado
        novas_tarefas = [
            tarefa for tarefa in tarefas
            if tarefa["id"] != tarefa_id
        ]

        # Verifica se alguma tarefa foi removida
        if len(novas_tarefas) == len(tarefas):
            return False

        # Atualiza o arquivo JSON
        self.salvar(novas_tarefas)

        return True