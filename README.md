# Front-end — Biblioteca S. Grêmio

## Integrantes da Equipe
- Alex Vinícius Correia dos Santos
- Ellian Calebe de Campos Costa
- João Henrique Schulz
- Kauan Sanders Moreira Santos

## O que foi desenvolvido
Desenvolvemos a interface web da **Biblioteca S. Grêmio** para consumir a Web API de gerenciamento de livros e revistas criada na disciplina de POO e a partir da tela inicial, o usuário consegue navegar para páginas de cada operação da consulta, cadastro, atualização e exclusão, além de verificar descrição, prazo e disponibilidade de empréstimo.

## Como executar a API
1. Abra o terminal na pasta da Web API (`Backend/MinhaBiblioteca`).
2. Execute os comandos para restaurar as dependências e rodar o servidor:
   ```bash
   dotnet restore
   dotnet run
   ```
3. A API ficará disponível localmente no endereço `http://localhost:5201` (com o Swagger acessível em `http://localhost:5201/swagger`).

## Como abrir e executar o front-end
1. Certifique-se de que a Web API em C# já está rodando.
2. Abra a pasta `frontend` no Visual Studio Code.
3. Inicie o arquivo `index.html` pelo integrated browser (configurada no projeto na porta `5501`, ex.: `http://127.0.0.1:5501/index.html`).

## URL da API e Endpoints consumidos
A URL base configurada no projeto para comunicação com o back-end é:
- `http://localhost:5201` (rota base dos recursos: `http://localhost:5201/api/Materiais`)

Os endpoints consumidos nas requisições `fetch` foram:
- **`GET /api/Materiais`** — Lista todos os livros e revistas cadastrados (`exibir_tudo.js`).
- **`GET /api/Materiais/{id}`** — Busca os dados de um material específico pelo ID (`consulta_por_id.js`).
- **`GET /api/Materiais/{id}/descricao`** — Exibe a descrição e o prazo de empréstimo do item conforme o tipo (`ver_descricao.js`).
- **`POST /api/Materiais/livro`** — Cadastra um novo livro (`adicionar_livro.js`).
- **`POST /api/Materiais/revista`** — Cadastra uma nova revista (`adicionar_revista.js`).
- **`POST /api/Materiais/{id}/emprestar`** — Realiza o empréstimo de um material pelo ID (`emprestimo.js`).
- **`PUT /api/Materiais/livro/{id}`** — Atualiza os dados de um livro existente (`atualizar_livro.js`).
- **`PUT /api/Materiais/revista/{id}`** — Atualiza os dados de uma revista existente (`atualizar_revista.js`).
- **`DELETE /api/Materiais/{id}`** — Exclui um material cadastrado pelo ID (`delete.js`).

## Organização do front-end
Separamos o front-end por métodos HTTP, mantendo a página principal na raiz da pasta `frontend` e subpastas específicas para cada operação, com seu próprio HTML, CSS e pasta `js/`:

```text
atividade-js-devweb-3-p2/
├── Backend/
│   ├── MinhaBiblioteca/
│   │   ├── Controllers/
│   │   │   └── MateriaisController.cs
│   │   ├── Models/
│   │   │   ├── IEmprestimo.cs
│   │   │   ├── Livro.cs
│   │   │   ├── MaterialBiblioteca.cs
│   │   │   └── Revista.cs
│   │   ├── Repositories/
│   │   │   ├── IMaterialRepository.cs
│   │   │   └── MaterialRepository.cs
│   │   ├── Properties/
│   │   ├── appsettings.json
│   │   ├── appsettings.Development.json
│   │   ├── MinhaBiblioteca.csproj
│   │   ├── MinhaBiblioteca.http
│   │   └── Program.cs
│   └── frontend/
│       ├── GET/
│       ├── POST/
│       ├── PUT/
│       ├── DELETE/
│       ├── index.html
|       ├── instrucoes.md
│       ├── style.css
│       └── scripts.js
├── README.md/
└── .vscode/
    └── settings.json

```

## Componentes do Bootstrap utilizados
Utilizamos o Bootstrap via CDN para estruturar o layout responsivo e os feedbacks visuais:
- **Grid e Layout responsivo:** `container`, `row`, `row-cols-1`, `row-cols-md-2`, `col`, além de utilitários Flexbox (`d-flex`, `flex-column`, `min-vh-100`, `justify-content-center`, `align-items-center`, `gap-*`).
- **Cabeçalho e Navegação:** `header` com `sticky-top`, `nav`, `nav-item` e `nav-link`.
- **Cards:** `card`, `card-body`, `card-title`, `card-subtitle` e `card-text` para organizar tanto o menu inicial quanto os formulários internos.
- **Formulários e Botões:** `form-group`, `form-label`, `form-control` e botões estilizados (`btn`).
- **Feedback visual e Saída:** `alert` (com `d-none` alterado via JavaScript para exibir avisos de carregamento, sucesso ou erro) e bloco `<pre id="saida">` para mostrar o retorno JSON da API.

## Validações implementadas
- **Cadastro de Livro e Revista (POST):** Verifica com trim() se os campos obrigatórios foram preenchidos antes de montar o objeto e enviar a requisição.
- **Atualização de Livro e Revista (PUT):** Valida se o id informado é um número inteiro positivo (Number.isInteger e o > 0) e se nenhum dos demais campos está vazio antes de disparar o `PUT`.
- **Exclusão (DELETE):** Verifica se o campo de ID não está vazio e exibe uma janela de confirmação (window.confirm) antes de enviar a requisição de exclusão para a API.
- **Tratamento de resposta da API:** Em todas as telas, verificamos resposta.o antes de ler o JSON e usamos .catch()` para exibir mensagens de erro amigáveis na tela caso o item não exista ou a requisição falhe (como tentar emprestar uma revista no endpoint de empréstimo).

## Dificuldades encontradas e como resolvemos
- **Design do front-end e estilização (HTML e CSS):** A parte mais trabalhosa do desenvolvimento foi montar o design das páginas, alinhar os cards e formulários e ajustar as cores e classes no HTML e CSS. Resolvemos combinando o sistema de grid, cards e utilitários do Bootstrap com classes personalizadas nos arquivos `style.css` de cada seção.
- **Organização das rotas e caminhos relativos:** Como dividimos as telas em subpastas GET, POST, PUT, DELETE, tivemos que ajustar os caminhos relativos dos links (../index.html), dos arquivos CSS (style.css) e dos scripts (js/...) para evitar erros de carregamento entre as páginas.

## Testes realizados
- Cadastro de livros e revistas via formulários POST, conferindo a geração automática de ID pela API.
- Listagem geral (exibir_tudo.html) e consulta individual (consulta_por_id.html) confirmando o retorno em JSON.
- Consulta de descrição e prazo (ver_descricao.html), validando o retorno de 14 dias para livros e 7 dias para revistas.
- Teste de empréstimo (emprestimo.html) com ID de livro (sucesso) e ID de revista (mensagem de erro informando que não é um livro).
- Atualização de registros existentes (PUT) e exclusão com confirmação (DELETE), testando também IDs inexistentes para validar o tratamento de erro.

## O que cada integrante aprendeu
- **Ellian Calebe de Campos Costa:** Ficou responsável pela documentação do projeto no README.md, revisando toda a estrutura de pastas, os endpoints consumidos, as validações implementadas e o fluxo de integração entre o front-end e a Web API para descrever o funcionamento completo da aplicação.
- **João Henrique:** Desenvolveu toda a estruturação das páginas HTML, estilização com CSS e Bootstrap, além da lógica em JavaScript (fetch, manipulação do DOM, eventos, validações de formulários e tratamento de respostas de sucesso e erro nos métodos GET, POST, PUT e DELETE).
- **Alex Vinícius:** Acompanhou a organização visual da interface, revisando o layout responsivo com Bootstrap e auxiliando nos testes de navegação entre as telas.
- **Kauan:** Participou da conferência dos requisitos da atividade e dos testes das rotas da API.
