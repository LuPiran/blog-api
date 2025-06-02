import Posts from "../models/Posts.js";

// GET /posts- Lista todos os posts
export const getAllPosts = async (req, res) => {
  try {
    //Busca todos os posts ordenados pela data de criacao (mais recente primeiro)
    const posts = await Posts.find().sort({ createdDate: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar posts", error });
  }
};

// GET /posts/:id - Retorna um post especifica pelo ID
export const getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    //Se o post for encontrado, retora ele
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar post", error });
  }
};

// POST /posts - Cria um novo post
export const createPost = async (req, res) => {
  try {
    // Cria um novo documento Post com os dados enviados no corpo da requisição
    const newPost = new Posts(req.body);

    //Salva o post no banco de dados
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar post", error });
  }
};

// PUT /posts/:id - Atualiza um post existente
export const updatePost = async (req, res) => {
  try {
    //Atualiza o post pelo ID com os novos dados enviados no corpo da requisicao
    const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post não encontrado para atualizar" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar post", error });
  }
};

// DELETE /posts/:id - Remove um post do banco
export const deletePost = async (req, res) => {
  try {
    //Deleta o post pelo id
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);

    if (deletePost) {
      res.status(200).json({ message: "Post deletado com sucesso" });
    } else {
      res.status(404).json({ message: "Post não encontrado para deletar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar post", error });
  }
};

// GET /posts/search?q=palavra - Busca post pelo titulo
export const searchPosts = async (req, res) => {
  try {
    //Extrai a palavra-chave da query string (?q=palavra)
    const { q } = req.query;

    //Usa expressao regular (case-insensitive) para buscar titulos que contenham a palavra
    const posts = await Posts.find({
      title: { $regex: q, $options: "i" },
    });

    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar posts por palavra-chave", error });
  }
};
