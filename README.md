# 📘 Blog Educacional - API REST

Esta é uma **API RESTful** para um blog educacional, onde professores podem postar conteúdos. A API foi construída com Node.js, Express e MongoDB, e inclui testes automatizados, cobertura de testes e integração contínua com GitHub Actions e Codecov.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Docker + Docker Compose
- Jest + Supertest (Testes automatizados)
- GitHub Actions (CI/CD)
- Codecov (Cobertura de testes)

---

## 📦 Instalação Local

1. Clone o repositório:

```bash
git clone https://github.com/LuPiran/blog-api.git
cd blog-api
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env`:

```env
MONGO_URI=mongodb+srv://<usuario>:<senha>@<host>/<database>?retryWrites=true&w=majority
```

4. Inicie o servidor localmente:

```bash
npm run dev
```

---

## 🐳 Usando com Docker

1. Suba o container (usando Mongo Atlas como banco externo):

```bash
docker build -t blog-api .
docker run -p 3000:3000 --env MONGO_URI=seu_mongo_uri blog-api
```

> Substitua `seu_mongo_uri` pela sua URI real do MongoDB.

---

## ✅ Rodando os Testes

```bash
npm test
```

### 📊 Cobertura de Testes

```bash
npm run test:coverage
```

---

## 🔁 Integração Contínua

A integração contínua está configurada via **GitHub Actions**. Toda vez que um `push` ou `pull request` é feito para a branch `main`, os testes automatizados e a cobertura são executados.

### 📈 Badge de cobertura (Codecov)

[![Cobertura](https://codecov.io/gh/LuPiran/blog-api/branch/main/graph/badge.svg)](https://codecov.io/gh/LuPiran/blog-api)

> Substitua `LuPiran` pelo seu usuário do GitHub para ativar o badge corretamente.

---

## 📚 Endpoints da API

### Listar todos os posts
`GET /posts`

### Buscar post por ID
`GET /posts/:id`

### Criar novo post
`POST /posts`

### Editar post existente
`PUT /posts/:id`

### Deletar post
`DELETE /posts/:id`

### Buscar por palavra-chave no título
`GET /posts/search?q=termo`
