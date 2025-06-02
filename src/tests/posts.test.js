import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import Post from "../models/Posts.js";

//Carrega as variaveis de ambiente do arquivo .env
dotenv.config();

//Conecta ao banco de dados antes de todos os tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

//Limpa todos os posts após cada teste
afterEach(async () => {
  await Post.deleteMany();
});

//Fecha a conexao com o MongoDB
afterAll(async () => {
  await mongoose.connection.close();
});

//Bloco principal dos testes
describe("Teste da API /posts", () => {
  //Teste de Criar post
  it("Criar um novo post", async () => {
    const res = await request(app).post("/posts").send({
      title: "Post de teste",
      description: "Conteudo criado para teste automarizado",
      image: "https://exemplo.com/images.jpg",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Post de teste");
  });

  //Teste de retornar todos os posts
  it("Retornar todos os posts", async () => {
    await Post.create({
      title: "Teste",
      description: "Testando",
    });

    const res = await request(app).get("/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  //Teste de retornar um teste por id
  it("Retorna um post por ID", async () => {
    const post = await Post.create({
      title: "Buscar",
      description: "Buscar pelo ID",
    });

    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Buscar");
  });

  //Teste de atualizar um post
  it("Atualizar um post existente", async () => {
    const post = await Post.create({
      title: "Antigo",
      description: "Descrição antiga",
    });

    const res = await request(app).put(`/posts/${post._id}`).send({
      title: "Atualizado",
      description: "Nova descricao",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Atualizado");
  });

  //Teste de deletar um post
  it("Deletar um post existente", async () => {
    const post = await Post.create({
      title: "Deletar",
      description: "Será deletado",
    });

    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Post deletado com sucesso");
  });

  //Teste de buscar um post por palavra chave
  it("Buscar posts por palavra-chave no titulo", async () => {
    const post = await Post.create({
      title: "Educacional",
      description: "Conteudo",
    });

    const res = await request(app).get("/posts/search?q=educa");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].title).toMatch(/educa/i);
  });
});
