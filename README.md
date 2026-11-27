# StudyFlow — Organizador de Estudos

O **StudyFlow** é uma aplicação web desenvolvida para auxiliar estudantes na organização e no acompanhamento de suas atividades acadêmicas. O sistema permite cadastrar tarefas, informar disciplinas e prazos, acompanhar o progresso e gerenciar atividades concluídas ou pendentes.

## Funcionalidades

- Cadastro de tarefas com nome, disciplina e prazo de entrega.
- Listagem das tarefas cadastradas.
- Edição de tarefas, permitindo atualizar nome, disciplina e prazo.
- Marcação e desmarcação de tarefas concluídas.
- Exclusão de tarefas.
- Atualização automática dos indicadores de progresso.
- Armazenamento dos dados em arquivo JSON.
- Persistência das informações após atualizar a página.

## Operações CRUD

O sistema implementa as quatro operações fundamentais de manipulação de dados:

- **Create (Criar):** cadastro de novas tarefas.
- **Read (Ler):** consulta e listagem das tarefas.
- **Update (Atulizar):** edição das informações das tarefas cadastradas.
- **Delete (Excluir):** remoção das tarefas.

## Tecnologias utilizadas

- **Python:** linguagem utilizada no back-end.
- **Bottle:** framework web responsável pelas rotas e requisições.
- **HTML:** estrutura da interface.
- **CSS:** estilização e responsividade.
- **JavaScript:** interatividade e comunicação com o back-end.
- **JSON:** armazenamento das tarefas.
- **Git e GitHub:** controle de versão e hospedagem do código.

## Arquitetura do projeto

O projeto utiliza o padrão arquitetural MVC (Model-View-Controller), separando as responsabilidades da aplicação.

- **Model:** responsável pelo gerenciamento e armazenamento das tarefas.
- **View:** responsável pela interface apresentada ao usuário.
- **Controller:** responsável por receber as requisições e conectar o Model à View.

## Estrutura de pastas

```text
studyflow-organizador-de-estudos/
│
├── app/
│   ├── controllers/
│   │   ├── application.py
│   │   └── study_controller.py
│   │
│   ├── models/
│   │   ├── tarefa.py
│   │   └── tarefas.json
│   │
│   ├── views/
│   │   └── html/
│   │       ├── helper.tpl
│   │       └── studyflow.tpl
│   │
│   └── static/
│       ├── css/
│       │   ├── helper.css
│       │   └── studyflow.css
│       ├── js/
│       │   ├── helper.js
│       │   └── studyflow.js
│       └── img/
│
├── route.py
├── requirements.txt
├── README.md
└── .gitignore
```

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/lalajup/studyflow-organizador-de-estudos.git
```

### 2. Entrar na pasta do projeto

```bash
cd studyflow-organizador-de-estudos
```

### 3. Criar um ambiente virtual

```bash
python -m venv .venv
```

### 4. Ativar o ambiente virtual

No Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 5. Instalar as dependências

```bash
pip install -r requirements.txt
```

### 6. Executar a aplicação

```bash
python route.py
```

### 7. Acessar o sistema

Abra o navegador no endereço:

```text
http://localhost:8080/studyflow
```

## Armazenamento dos dados

As tarefas são armazenadas localmente no arquivo `app/models/tarefas.json`, utilizando o formato JSON. 

As operações de cadastro, edição e exclusão atualizam os dados armazenados, permitindo que as informações permaneçam disponíveis após a atualização da página e entre execuções do servidor.

## Objetivo acadêmico

Este projeto foi desenvolvido como atividade prática de desenvolvimento web, com o objetivo de aplicar conceitos de programação em Python, arquitetura MVC, operações CRUD, integração entre front-end e back-end, manipulação de arquivos JSON e controle de versão com Git.
