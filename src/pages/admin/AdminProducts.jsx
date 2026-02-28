import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../config/firebase";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const user = auth.currentUser;
    await axios.post(
      "http://localhost:5000/api/products",
      { name, price, description: desc },
      { headers: { uid: user.uid } }
    );
    setName(""); setPrice(""); setDesc("");
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    const user = auth.currentUser;
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { uid: user.uid }
    });
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <div className="bg-white p-4 shadow rounded mb-4 space-y-2">
        <input className="border p-2 w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button onClick={addProduct} className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
      </div>

      <div className="bg-white shadow rounded">
        {products.map(p => (
          <div key={p._id} className="flex justify-between p-3 border-b">
            <div>
              <b>{p.name}</b> – ₹{p.price}
              <p className="text-sm text-gray-500">{p.description}</p>
            </div>
            <button onClick={()=>deleteProduct(p._id)} className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}