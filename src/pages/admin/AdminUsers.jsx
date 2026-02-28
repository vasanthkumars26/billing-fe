import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.map(u => (
        <div key={u._id} className="border p-2 mb-2">
          {u.email} - {u.role}
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;