import { useState } from 'react'

function User(props) {
  
  return (
    <>
     <h3>Nome: {props.nome} </h3>
     <p>Idade: {props.idade} </p>
    </>
  )
}

export default User
