'use client';
export default function CartSummary({ cart, products, onDecrement, onReset}) {
    const items = Object.defineProperties(cart)
    .map(([id, qty]) => {
        const prod = products.find((p) => p.id === id);
        return prod ? {...prod, qty} : null;
    })
    .filter(Boolean);

    const count = items.reduce((s, it) => s + it.qty, 0);
    const total = items.reduce((s, it) => s +it.qty * it.price, 0);

    return (
        <div className= "border p-3 rounded">
            <h4 className="font-semibold">Cart</h4>
            <div className="text-sm text-gray-600">Items: {count}</div>
            <div className= "text-sm font-medium">Total: ${total}</div>
            {items.length === 0? (
                <div className="text-xs text-gray-500 mt-2">Your cart is empty </div>) :( 
                    <div className='mt-2 space-y-2'>
                        {items.map((it) => (<div key={it.id} className="flex justify-between text-sm">
                            <div>{it.name} x{it.qty}</div>
                            <div className="flex gap-2">
                                <button className="px-2 rounded border text-xs"
                                onClick={() => onDecrement(it.id)}></button>
                                </div>
                                </div>
                        ))}
                <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={onReset}>Reset Cart</button>
                </div>
                </div>
            )}
        </div>
    )
}