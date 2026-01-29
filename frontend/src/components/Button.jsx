export function Button({ label }) {
  return (
    <button
      className="w-full text-white bg-slate-900 hover:bg-slate-800 
                 focus:outline-none focus:ring-4 focus:ring-gray-300 
                 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
      {label}
    </button>
  );
}
