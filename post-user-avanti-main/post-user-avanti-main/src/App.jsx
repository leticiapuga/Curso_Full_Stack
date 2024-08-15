import PostList from "./components/PostList"
import PostForm from "./components/PostForm"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContext"

const ProtectRoute = ({component: Component}) => {
  const { userId } = useContext(AuthContext);
  return userId ? <Component/> : <Login/>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectRoute component={PostList}/>}/>
        <Route path="/create-post" element={<ProtectRoute component={PostForm}/>}/>
        <Route path="/login" element={<ProtectRoute component={Login}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
