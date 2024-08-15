import { useContext, useEffect, useState } from "react"
import { getAllPosts, deletePost, updatePost } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function PostList() {
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateContent, setUpdateContent] = useState("")
  const [search, setSearch] = useState("")
  const { userId, logout } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  },[])

  const getPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
  }

  const handleDelete = async (id) => {
    await deletePost(id);
    getPosts()
  }

  const handleEdit = async (post) => {
    setEditing(post.id)
    setUpdateTitle(post.title)
    setUpdateContent(post.content)
  }

  const handleUpdate = async (id) => {
    const updatedPost = {
      id,
      title: updateTitle,
      content: updateContent
    };
    await updatePost(updatedPost);
    setEditing(null)
    getPosts()
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.content.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Posts</h1>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="row mb-4">
        <div className="col">
          <input 
            type="text" 
            placeholder="Search by title or content" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="form-control" 
          />
        </div>
        <div className="col text-end">
          <button className="btn btn-success" onClick={() => navigate("/create-post")}>
            + Add Post
          </button>
        </div>
      </div>
      <div className="row">
        {filteredPosts.map((post) => (
          <div key={post.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={post.image} className="card-img-top" alt={post.title} style={{ height: "200px", objectFit: "cover" }} />
              <div className="card-body">
                
                {editing === post.id ? 
                  <>
                    <input 
                      className="form-control mb-2" 
                      type="text" 
                      value={updateTitle}
                      onChange={(e) => setUpdateTitle(e.target.value)}
                    />
                    <textarea 
                      className="form-control mb-2" 
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                    />          
                    <button className="btn btn-success" onClick={() => handleUpdate(post.id)}>
                      Save
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => setEditing(null)}>
                      Cancel
                    </button>
                  </>
                : (
                  <>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    { userId === post.user_id &&
                    <>
                      <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                        Delete
                      </button>
                      <button className="btn btn-primary ms-2" onClick={() => handleEdit(post)}>
                        Edit
                      </button>
                    </>
                  }
                  </>
               )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PostList
