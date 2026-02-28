import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orderService";

export default function AdminOrders(){
  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    getAllOrders().then(res=>setOrders(res.data));
  },[]);

  return (
    <div>
      <h1 className="text-xl font-bold">All Orders</h1>
      {orders.map(o=>(
        <div key={o._id} className="border p-3 mt-3">
          <p>User: {o.userEmail}</p>
          <p>Total: ₹{o.total}</p>
          <ul>
            {o.items.map(i=><li key={i._id}>{i.name}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}