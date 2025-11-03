'use client';
import { useState } from 'react';


export default function ProductCard({ product, onAdd }) {
const [adding, setAdding] = useState(false);


function handleAdd() {
if (product.stock <= 0) return;
setAdding(true);
setTimeout(() => {
onAdd();
setAdding(false);
}, 250);
}


return (
<div className="border rounded p-4 flex flex-col justify-between bg-white">
<div>
<h4 className="font-semibold text-lg">{product.name}</h4>
<div className="text-sm text-gray-600">{product.category}</div>
<div className="mt-2 text-xl font-bold">${product.price}</div>
</div>


<div className="mt-4 flex items-center justify-between">
<div>
{product.stock > 0 ? (
<span className="text-sm text-green-600">In stock: {product.stock}</span>
) : (
<span className="text-sm text-red-600 font-semibold">Out of stock</span>
)}
</div>


<button
onClick={handleAdd}
disabled={product.stock <= 0 || adding}
className={`px-3 py-1 rounded shadow text-white ${product.stock <= 0 || adding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
>
{adding ? 'Adding...' : 'Add'}
</button>
</div>
</div>
);
}