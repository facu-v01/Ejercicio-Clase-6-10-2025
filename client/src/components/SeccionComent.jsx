import {useState} from 'react';

function SeccionComent({post, setPosts}) {
    const [comentario, setComentario] = useState({autor: "", contenido: ""})
    const handleAddComment = (e) => {
    e.preventDefault();
    if (!comentario.autor || !comentario.contenido)
      return alert("Completa ambos campos");

    fetch(`http://localhost:4000/api/posts/${post.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comentario),
    })
      .then((res) => res.json())
      .then((nuevoComentario) => {
        // Agregar el comentario al post correspondiente
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id
              ? { ...p, comments: [...p.comments, nuevoComentario] }
              : p
          )
        );
        setComentario({ autor: "", contenido: "" });
      })
      .catch((err) => console.error("Error al agregar comentario:", err));
  };


    return (
        <div className='comments'>
            <h3>Comentarios</h3>
            {post.comments.length === 0 ? (
            <p>No hay comentarios</p>
            ) : (
            post.comments.map((comment) => (
                <div key={comment.id} className='comment'>
                    <p><strong>{comentario.autor}</strong></p>: <p>{comentario.contenido}</p>
                </div>
            ))
            )}


            <form onSubmit={handleAddComment} className="comment-form">
                <input
                    type="text"
                    placeholder="Tu nombre"
                    value={comentario.autor}
                    onChange={(e) => setComentario({ ...comentario, autor: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Tu comentario"
                    value={comentario.contenido}
                    onChange={(e) => setComentario({ ...comentario, contenido: e.target.value })}
                />
                <button type="submit">Comentar</button>
            </form>
        </div>
    );
}

export default SeccionComent;