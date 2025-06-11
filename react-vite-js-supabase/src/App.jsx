import { useEffect, useState } from 'react';
import './App.css'
import { supabase } from './supabaseClient'

function App() {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ App ~ products:", products)
  useEffect(() => {
    console.log("tt");
    getProducts();
    console.log("pp");
  }, []);
  async function getProducts() {
    const { data: products, error } = await supabase.from("products").select("*");
    setProducts(products);
  }
  return (
    <>
    <ul>
    {
      products.map((product) => (
        <li key={product.id}>{product.title} -- {product.price}</li>
      ))
    }
    </ul>
    </>
  )
}

export default App
