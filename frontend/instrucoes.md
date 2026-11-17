# Trabalho Final — Integração entre API e Front-end

## Desenvolvimento Web e Mobile I

Este trabalho deverá ser realizado em conjunto com a atividade de Programação Orientada a Objetos.

Na disciplina de POO, a equipe deverá desenvolver uma Web API em C# para gerenciamento de uma biblioteca universitária. Nesta disciplina, a mesma equipe deverá criar um front-end para consumir essa API e apresentar seus dados em uma interface web.

O front-end deverá ser criado dentro do mesmo repositório da API, em uma pasta chamada `front`.

## Valor e formação das equipes

Esta atividade vale **2,0 pontos** em Desenvolvimento Web e Mobile I.

O trabalho poderá ser realizado em equipes de até **4 integrantes**, seguindo a mesma formação da atividade de POO.

Todos os integrantes devem participar do desenvolvimento, conhecer o funcionamento do código e conseguir explicar as decisões tomadas pela equipe.

## Objetivo

Criar uma interface web responsiva para consultar e gerenciar os livros e as revistas cadastrados na Web API de biblioteca.

O projeto deverá demonstrar que a equipe sabe:

- estruturar uma página com HTML;
- utilizar componentes do Bootstrap;
- criar uma interface responsiva;
- selecionar e alterar elementos com JavaScript;
- trabalhar com eventos e formulários;
- validar dados no front-end;
- realizar requisições com `fetch`;
- consumir uma API utilizando GET, POST, PUT e DELETE;
- tratar respostas de sucesso e erro;
- organizar um projeto completo no GitHub.

## Organização obrigatória do projeto

O front-end deverá ficar na raiz do mesmo repositório da API, dentro da pasta `front`.

```text
BibliotecaApi/
├── Controllers/
├── Models/
├── Repositories/
├── Program.cs
├── BibliotecaApi.csproj
├── README.md
└── front/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md
```

O front-end não deverá ser entregue em outro repositório.

## Tecnologias obrigatórias

Utilizem:

- HTML5;
- CSS3;
- Bootstrap;
- JavaScript ES6;
- DOM;
- eventos;
- formulários;
- `fetch`;
- Git e GitHub.

Não é necessário utilizar React, Angular, Vue, banco de dados no front-end, login ou autenticação.

## O que deverá ser desenvolvido

### 1. Preparação do front-end

Criem a pasta `front` e adicionem os arquivos:

- `index.html`;
- `style.css`;
- `script.js`.

Executem a API criada em POO e verifiquem no Swagger o endereço e a porta utilizados.

No JavaScript, criem uma constante para armazenar a URL principal da API:

```javascript
const API_URL = "https://localhost:7000/api/Materiais";
```

A porta deverá ser substituída pela porta apresentada no projeto de cada equipe.

### 2. Interface com Bootstrap

Criem uma interface visual para o sistema de biblioteca utilizando Bootstrap.

A página deverá conter, no mínimo:

- cabeçalho com o nome do sistema;
- área de resumo ou dashboard;
- seção de listagem dos materiais;
- formulário para cadastro;
- área para edição;
- mensagens de sucesso e erro;
- botões para consultar, editar, excluir e realizar empréstimo.

A equipe poderá utilizar tabela, cards ou outra organização adequada para apresentar os materiais.

### 3. Listagem de materiais com GET

Utilizem o endpoint abaixo para carregar os materiais:

```text
GET /api/Materiais
```

A interface deverá apresentar:

- título;
- ano de publicação;
- tipo do material;
- autor e páginas, quando for livro;
- edição e mês de publicação, quando for revista;
- ações disponíveis para cada material.

Também deverá existir uma mensagem adequada quando não houver materiais cadastrados ou quando a requisição apresentar erro.

### 4. Consulta por ID

Criem uma forma de consultar um material específico:

```text
GET /api/Materiais/{id}
```

O resultado poderá ser exibido em um modal, card, área de detalhes ou outra solução visual coerente.

### 5. Cadastro de livro e revista com POST

Criem formulários para cadastrar livros e revistas.

O formulário de livro deverá possuir:

- título;
- ano de publicação;
- autor;
- número de páginas.

Endpoint:

```text
POST /api/Materiais/livro
```

O formulário de revista deverá possuir:

- título;
- ano de publicação;
- número da edição;
- mês de publicação.

Endpoint:

```text
POST /api/Materiais/revista
```

O ID não deverá ser informado pelo usuário. Ele será gerado pela API.

Antes de enviar os dados, o JavaScript deverá verificar se os campos estão preenchidos corretamente e mostrar mensagens ao usuário.

### 6. Atualização com PUT

Permitam que o usuário edite os dados de um material existente.

Para livros:

```text
PUT /api/Materiais/livro/{id}
```

Para revistas:

```text
PUT /api/Materiais/revista/{id}
```

O formulário deverá ser preenchido com os dados atuais do material. O ID utilizado na URL deverá ser o ID do material que está sendo editado.

Após a atualização, a lista deverá ser carregada novamente.

### 7. Exclusão com DELETE

Adicionem uma ação para excluir materiais:

```text
DELETE /api/Materiais/{id}
```

Antes de realizar a exclusão, solicitem confirmação do usuário.

Após a exclusão:

- atualizem a lista;
- exibam uma mensagem de sucesso;
- tratem o caso de o material não existir;
- mostrem uma mensagem de erro quando necessário.

### 8. Descrição e prazo de empréstimo

Criem uma ação para consultar a descrição e o prazo de empréstimo:

```text
GET /api/Materiais/{id}/descricao
```

A interface deverá mostrar as informações retornadas pela API, incluindo o tipo, a descrição e o prazo de empréstimo.

O prazo deverá ser calculado pela API conforme o tipo do material:

- livro: 14 dias;
- revista: 7 dias.

### 9. Empréstimo

Criem uma ação para tentar realizar o empréstimo de um material:

```text
POST /api/Materiais/{id}/emprestar
```

A interface deverá apresentar corretamente o resultado:

- mensagem de sucesso para um livro;
- mensagem de erro para uma revista;
- mensagem adequada quando o material não for encontrado.

### 10. Responsividade e acessibilidade

A interface deverá funcionar em telas pequenas, médias e grandes.

Utilizem o sistema de grid e os componentes responsivos do Bootstrap.

Também observem:

- `label` associado aos campos;
- textos legíveis;
- botões com nomes claros;
- contraste adequado;
- espaçamento suficiente;
- mensagens visuais compreensíveis;
- ausência de elementos cortados em telas menores.

## Orientações sobre JavaScript

O JavaScript deverá utilizar os conceitos estudados em aula, como:

- `querySelector`;
- `querySelectorAll`;
- `textContent`;
- `classList`;
- funções;
- arrays e objetos;
- eventos;
- `submit`;
- `preventDefault`;
- `async` e `await`, se utilizados nas requisições;
- `fetch`;
- tratamento de respostas e erros.

A equipe deverá evitar colocar todo o código em uma única função. Organizem funções para tarefas como:

- carregar materiais;
- renderizar materiais;
- cadastrar livro;
- cadastrar revista;
- editar material;
- excluir material;
- mostrar mensagens.

## Cuidados importantes

- A validação do front-end melhora a experiência do usuário, mas não substitui a validação da API.
- Não coloquem senhas, tokens ou informações privadas no JavaScript.
- Não criem login ou autenticação, pois isso não faz parte do enunciado da API.
- Utilizem `textContent` quando possível para inserir textos na página.
- Tenham cuidado ao utilizar `innerHTML` com dados recebidos externamente.
- Verifiquem `response.ok` antes de considerar uma requisição bem-sucedida.
- Usem o Console e a aba **Network** do navegador para investigar erros.
- Não alterem as regras da API apenas para facilitar o front-end.

## README da equipe

O README deverá ser simples, escrito pela própria equipe e com linguagem natural.

Ele deverá explicar, com as palavras dos integrantes:

- o que foi desenvolvido;
- como executar a API;
- como abrir ou executar o front-end;
- qual URL da API foi utilizada;
- quais endpoints foram consumidos;
- como o front-end foi organizado;
- quais componentes do Bootstrap foram utilizados;
- quais validações foram implementadas;
- quais dificuldades foram encontradas;
- como as dificuldades foram resolvidas;
- o que cada integrante aprendeu.

Não é necessário criar uma documentação profissional ou excessivamente elaborada. O objetivo é demonstrar que a equipe realmente compreendeu o que desenvolveu.

> **⚠️ ATENÇÃO SOBRE O README**
>
> Não entreguem um README genérico, artificial ou excessivamente padronizado apenas para parecer completo. O texto deve ser escrito pela equipe e representar o desenvolvimento realizado.
>
> Um README claramente produzido por inteligência artificial, com informações que a equipe não consegue explicar ou que não correspondem ao projeto, poderá ter parte da pontuação de documentação desconsiderada.
>
> O README não precisa ser perfeito. Ele precisa ser verdadeiro, compreensível e escrito com as palavras de vocês.

## Avaliação — Desenvolvimento Web e Mobile I

| Critério | Valor |
|---|---:|
| Integração com a API utilizando GET, POST, PUT e DELETE | 0,80 |
| Interface responsiva utilizando Bootstrap | 0,40 |
| JavaScript, DOM, eventos, formulários e feedback visual | 0,40 |
| Organização do código e estrutura da pasta `front` | 0,20 |
| README simples, testes e entrega no GitHub | 0,20 |
| **Total** | **2,00** |

## Entrega

A entrega deverá ser feita por meio do link do repositório público no GitHub.

O repositório deverá conter:

- a Web API completa da disciplina de POO;
- a pasta `front` com o front-end funcionando;
- os arquivos HTML, CSS e JavaScript;
- o README preenchido;
- os nomes de todos os integrantes;
- exemplos ou descrição dos testes realizados.

**Apenas um integrante da equipe precisa enviar o link do repositório na atividade do Google Classroom.**

Não é necessário que todos os integrantes enviem o mesmo link. O integrante responsável pelo envio deverá conferir se o repositório está público e contém todos os arquivos antes de entregar.

## Como executar

### API

Na pasta principal do projeto, execute:

```bash
dotnet restore
dotnet run
```

Depois, acesse o Swagger no endereço apresentado pelo terminal, normalmente semelhante a:

```text
https://localhost:PORTA/swagger
```

### Front-end

Entre na pasta `front` e abra o `index.html` utilizando o Live Server do Visual Studio Code ou outro servidor local.

Verifique se a constante `API_URL` no `script.js` aponta para o endereço correto da API.

## Checklist antes da entrega

- [ ] A equipe possui no máximo 4 integrantes.
- [ ] A API está funcionando.
- [ ] O Swagger está disponível.
- [ ] A pasta `front` está na raiz do repositório.
- [ ] O `index.html` abre corretamente.
- [ ] O Bootstrap foi utilizado.
- [ ] A interface é responsiva.
- [ ] O front lista materiais com GET.
- [ ] O front cadastra livros e revistas com POST.
- [ ] O front atualiza materiais com PUT.
- [ ] O front exclui materiais com DELETE.
- [ ] A descrição e o prazo de empréstimo são exibidos.
- [ ] O empréstimo de livro e revista foi testado.
- [ ] Existem mensagens de sucesso e erro.
- [ ] Os formulários possuem validação.
- [ ] O README foi escrito pela equipe.
- [ ] O repositório está público.
- [ ] Apenas um integrante enviou o link no Classroom.

O objetivo da atividade não é apenas entregar uma tela funcionando. A equipe deverá compreender como uma interface web se comunica com uma API e conseguir explicar o caminho dos dados entre o front-end e o back-end.