import { useContext, useState } from "react"
import { auth } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { sign } = useContext(AuthContext)

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        const data = await auth(email, password);
        sign(data);
        navigate("/");
    } catch(e) {
        setError("Invalid email or password")
    }
    
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
     <form onSubmit={handleSubmit}>
        <div className="mb-3">
            {error && <p className="alert alert-danger">{error}</p>}
            <label>Email</label>
            <input 
                className="form-control"
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-3">
            <label>Password</label>
            <input
                type="password" 
                className="form-control"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    
        <button className="btn btn-primary" type="submit">Login</button>
     </form>
    </div>
  )
}

export default Login
