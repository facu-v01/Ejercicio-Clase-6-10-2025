import SeccionComent from "./SeccionComent";

function ListPost({ posts, setPosts }) {
  return (
    <div className="post-list">
        {posts.length === 0 ? (
            <p>No hay publicaciones</p>
        ) : (
            posts.map((post) => (
                <div key={post.id} className="post">
                    <h2>{post.titulo}</h2>
                    <p><strong>{post.contenido}</strong></p>
                    <small>
                        Por <strong>{post.autor}</strong>
                    </small>
                    <SeccionComent post={post} setPosts={setPosts} />
                </div>
            ))
        )}
    </div>
  );
}

export default ListPost;