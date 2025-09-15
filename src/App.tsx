import './App.css'
import { useState, useEffect } from 'react'
type ProdutoType = {
  _id: number;
  nome: string;
  preco: number;
  urlfoto: string;
  descricao: string;
}
function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  useEffect(() => {
    fetch('/api/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data))
  }, [])

  return (
    <>
      <div>
        <h1>TERE</h1>
      </div>
      {
        produtos.map((produto) => (
          <div key={produto._id}>
            <h2>{produto.nome}</h2>
            <p>R${produto.preco}</p>
            <img src={produto.urlfoto} alt={produto.nome} width="200" />
            <p>{produto.descricao}</p>
          </div>
        ))}
    </>
  )

}
export default App
