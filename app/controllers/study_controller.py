from bottle import template, request, response
from app.models.tarefa import TarefaModel

import json


class StudyController:

    def __init__(self):
        self.modelo = TarefaModel()

    def index(self):
        return template('app/views/html/studyflow')

    def listar_tarefas(self):
        response.content_type = 'application/json'

        tarefas = self.modelo.listar()

        return json.dumps(tarefas, ensure_ascii=False)

    def adicionar_tarefa(self):
        response.content_type = 'application/json'

        dados = request.json

        if not dados:
            response.status = 400
            return json.dumps({"erro": "Dados não enviados"})

        nome = dados.get("nome")
        disciplina = dados.get("disciplina")
        prazo = dados.get("prazo")

        if not nome or not disciplina or not prazo:
            response.status = 400
            return json.dumps({"erro": "Preencha todos os campos"})

        tarefa = self.modelo.adicionar(
            nome,
            disciplina,
            prazo
        )

        response.status = 201

        return json.dumps(tarefa, ensure_ascii=False)

    def concluir_tarefa(self, tarefa_id):
        response.content_type = 'application/json'

        tarefa = self.modelo.alternar_conclusao(int(tarefa_id))

        if tarefa is None:
            response.status = 404
            return json.dumps({"erro": "Tarefa não encontrada"})

        return json.dumps(tarefa, ensure_ascii=False)
    
    def excluir_tarefa(self, tarefa_id):
        response.content_type = 'application/json'

        sucesso = self.modelo.excluir(int(tarefa_id))

        if not sucesso:
            response.status = 404
            return json.dumps({
                "erro": "Tarefa não encontrada"
            })

        return json.dumps({
            "mensagem": "Tarefa excluída com sucesso"
        })