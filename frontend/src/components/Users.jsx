import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(
      "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    ).then(res => {
      setUsers(res.data.user);
    });
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full px-2 py-1 border rounded border-slate-200 mt-2"
        onChange={(e) => setFilter(e.target.value)}
      />

      {users.map(user => (
        <div key={user._id} className="flex justify-between mt-4">
          <div className="flex">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center">
              <div className="flex flex-col justify-center h-full text-xl">
                {user.firstName[0]}
              </div>
            </div>
            <div className="flex flex-col justify-center h-full ml-4">
              {user.firstName} {user.lastName}
            </div>
          </div>

          <button
            onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            Send Money
          </button>
        </div>
      ))}
    </div>
  );
}
