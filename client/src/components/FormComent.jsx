import React, { useState } from 'react';

const FormComent = () => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the comment data
    console.log('Nuevo comentario:', { author, content });
    // Clear the form
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Autor:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nombre del autor"
          required
        />
      </div>
      <div>
        <label htmlFor="content">Comentario:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu comentario aquí"
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormComent;
