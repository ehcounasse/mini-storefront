'use client';
export default function StatusMessage({ loading, error, empty}) {
    if (loading) return <div className="py-6"> Loading products...</div>;
    if (error) return <div className="py-6 text-red-600">Error: {error} </div>;
    if (empty) return <div className= "py-6 text-gray-600"> No products match your filters.</div>;
    return null;
}