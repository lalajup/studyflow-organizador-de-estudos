from app.controllers.application import Application
from bottle import Bottle, route, run, request, static_file
from bottle import redirect, template, response
from app.controllers.study_controller import StudyController


app = Bottle()
ctl = Application()
study_ctl = StudyController()

#-----------------------------------------------------------------------------
# Rotas:

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./app/static')

@app.route('/helper')
def helper(info= None):
    return ctl.render('helper')


#-----------------------------------------------------------------------------
# Suas rotas aqui:

# Página principal do StudyFlow
@app.route('/studyflow')
def studyflow():
    return study_ctl.index()

# Lista todas as tarefas
@app.route('/api/tarefas', method='GET')
def listar_tarefas():
    return study_ctl.listar_tarefas()

# Cadastra uma nova tarefa
@app.route('/api/tarefas', method='POST')
def adicionar_tarefa():
    return study_ctl.adicionar_tarefa()

# Alterna o estado de conclusão de uma tarefa
@app.route('/api/tarefas/<tarefa_id:int>/concluir', method='POST')
def concluir_tarefa(tarefa_id):
    return study_ctl.concluir_tarefa(tarefa_id)

# Atualiza os dados de uma tarefa
@app.route('/api/tarefas/<tarefa_id:int>', method='PUT')
def atualizar_tarefa(tarefa_id):
    return study_ctl.atualizar_tarefa(tarefa_id)

@app.route('/api/tarefas/<tarefa_id:int>', method='DELETE')
def excluir_tarefa(tarefa_id):
    return study_ctl.excluir_tarefa(tarefa_id)

#-----------------------------------------------------------------------------


if __name__ == '__main__':

    run(app, host='0.0.0.0', port=8080, debug=True)