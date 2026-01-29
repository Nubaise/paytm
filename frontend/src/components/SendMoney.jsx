export function SendMoney() {
  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center">Send Money</h2>

          <div className="flex items-center mt-6">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl">
              A
            </div>
            <div className="ml-4">
              <div className="text-lg font-semibold">Friend's Name</div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">
              Amount (in Rs)
            </label>
            <input
              type="text"
              placeholder="Enter amount"
              className="w-full mt-1 px-2 py-1 border rounded border-slate-200"
            />
          </div>

          <button className="w-full bg-green-500 text-white mt-6 py-2 rounded-lg">
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
