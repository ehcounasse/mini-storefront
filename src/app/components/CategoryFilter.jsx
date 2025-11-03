'use client';
export default function CategoryFilter({ value, onChange, options = [] }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Filter by Category</h3>
      <select
        className="mt-1 w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={options.includes(value) ? value : options[0]}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
