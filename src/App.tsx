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

  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      nome: formData.get('nome') as string,
      preco: Number(formData.get('preco')),
      urlfoto: formData.get('urlfoto') as string,
      descricao: formData.get('descricao') as string,
    };

    fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newProduto) =>
        setProdutos((prev) => [...prev, newProduto])
      )
      .catch((error) => console.error('Error posting data:', error));

    form.reset();
  }

  function adicionarCarrinho(produtoId: number) {
    const clienteId = '12345';
    fetch('/api/carrinho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ produtoId, clienteId }),
    }).catch((error) => console.error('Error adding to cart:', error));
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
        <h1>Adicionar ao Carrinho</h1>
      </div>
      {produtos.map((produto) => (
        <div key={produto._id}>
          <h2>{produto.nome}</h2>
          <p>R${produto.preco}</p>
          <img src={produto.urlfoto} alt={produto.nome} width="200" />
          <p>{produto.descricao}</p>
          <button onClick={() => adicionarCarrinho(produto._id)}>
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </>
  );
}
