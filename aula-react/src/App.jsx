import { useState } from 'react'
import './App.css'
import User from './components/User'

function App() {
  
  const [users, setUsers] = useState(
    [
      {nome: "Nathalia", idade: 23},
      {nome: "Nathalia", idade: 23},
      {nome: "Nathalia", idade: 23},
      {nome: "Nathalia", idade: 23},
      {nome: "Nathalia", idade: 23}
    ]
  )

  return (
    <>
     <User nome= {"Nathalia"} idade={24}/>
     <User nome= {"Michele"} idade={25}/>
    </>
  )
}

export default App
