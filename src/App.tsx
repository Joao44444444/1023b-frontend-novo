import './App.css'
import { useState } from 'react'

type ProdutoType = {
  _id: number;
  nome: string;
  preco: number;
  urlfoto: string;
  descricao: string;
}

export default function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
      .then((response) => response.json())
      .then((NewProduto) => setProdutos([...produtos, NewProduto]))
      .catch((error) => console.error('Error posting data:', error))
    form.reset();

  }

  return (
    <>
      <div>
        <div>Cadastro de produtos</div>
        <form onSubmit={handleForm}>
          <input type="text" name="nome" placeholder="Nome" />
          <input type="number" name="preco" placeholder="Preço" />
          <input type="text" name="urlfoto" placeholder="URL da foto" />
          <input type="text" name="descricao" placeholder="Descrição" />
          <button type="submit">Cadastrar</button>
        </form>
        <h1>Lista de produtos</h1>
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
