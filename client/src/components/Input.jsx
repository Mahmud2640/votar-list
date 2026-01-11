export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 transition
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-indigo-200"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
        `}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
