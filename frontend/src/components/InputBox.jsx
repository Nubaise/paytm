export function InputBox({ label, placeholder }) {
  return (
    <div className="w-full px-4 pt-4">
      <label className="text-sm font-medium text-left py-2">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}
