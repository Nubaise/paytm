import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SendMoney() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const to = searchParams.get("id");
  const name = searchParams.get("name");

  async function sendMoney() {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Transfer failed");
    }
  }

  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center">Send Money</h2>

          <div className="flex items-center mt-6">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl">
              {name?.[0] || "U"}
            </div>
            <div className="ml-4 text-lg font-semibold">
              {name || "User"}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Amount (in Rs)
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Enter amount"
              className="w-full mt-1 px-2 py-1 border rounded border-slate-200"
            />
          </div>

          <button
            onClick={sendMoney}
            disabled={!to || !amount}
            className="w-full bg-green-500 text-white mt-6 py-2 rounded-lg disabled:opacity-50"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
