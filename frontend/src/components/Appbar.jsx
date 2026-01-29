import { useNavigate } from "react-router-dom";

export function Appbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div className="shadow h-14 flex justify-between px-4">
      <div className="flex flex-col justify-center h-full font-semibold">
        Payments App
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="text-sm text-red-600 font-medium"
        >
          Logout
        </button>

        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center">
          <div className="flex flex-col justify-center h-full text-xl">
            U
          </div>
        </div>
      </div>
    </div>
  );
}
