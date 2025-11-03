'use client';
import{useState, useEffect} from 'react';

export default function PriceFilter ({ value, onChange, max = 0}) {
    const [local,setLocal] = useState(value === 'Infinity' ? max : Number(value));

    useEffect (() => {
        setLocal(value === 'Infinity' ? max : Number(value));
    }, [value,max]);

    function handleSlider(e) {
        const v = Number(e.target.value);
        setLocal(v);
        onChange(v)
    }

    function handleOff() {
        setLocal(max);
        onChange('Infinity');
    }
    return (
       <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Filter by Price</h3>

      <div className="text-sm mb-2">
        Max: {local === max ? 'No limit' : `$${local}`}
      </div>

      <input
        type="range"
        min="0"
        max={max || 1000}
        value={local}
        onChange={handleSlider}
        className="w-full accent-blue-600 cursor-pointer"
      />

      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          className="text-sm px-3 py-1 border rounded hover:bg-blue-50"
          onClick={() => onChange(50)}
        >
          Up to $50
        </button>
        <button
          className="text-sm px-3 py-1 border rounded hover:bg-blue-50"
          onClick={() => onChange(100)}
        >
          Up to $100
        </button>
        <button
          className="text-sm px-3 py-1 border rounded hover:bg-blue-50"
          onClick={handleOff}
        >
          No Limit
        </button>
      </div>
    </div>
  );
}