const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());


let posts = [];
const newId = () => crypto.randomUUID();

// GET /api/posts - listar posts con comentarios
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// POST /api/posts - crear post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'title, content y author son requeridos' });
  }
  const post = {
    id: newId(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    comments: [],
  };
  posts.unshift(post);
  res.status(201).json(post);
});

// POST /api/posts/:id/comments - agregar comentario a un post
app.post('/api/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: 'author y content son requeridos' });
  }
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });

  const comment = {
    id: newId(),
    author,
    content,
    createdAt: new Date().toISOString(),
  };
  post.comments.push(comment);
  res.status(201).json(comment);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));
