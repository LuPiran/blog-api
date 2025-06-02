import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";

//Carrega variaveis do arquivo .env
dotenv.config();

const app = express();

//Define a porta onde o servidor deve rodar
const PORT = process.env.PORT || 3000;

//Middleware para aceitar JSON no corpo das requisicoes
app.use(express.json());

//Rota da aplicacao
app.use("/posts", postsRoutes);

//Rota base para teste
app.get("/", (req, res) => {
  res.send("API do Blog Educacional esta online");
});

//Conexao com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  //Se a conexao for bem sucedida, exibe no console
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  //Se ocorrer erro na conexao com o banco, exibe no console
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB: ", err);
  });

export default app;
