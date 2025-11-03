import Catalog from './components/Catalog';


export default function Page() {
return (
<main className="min-h-screen bg-gray-50 p-6">
<div className="max-w-6xl mx-auto">
<header className="mb-6">
<h1 className="text-3xl font-extrabold text-gray-900">Mini Storefront</h1>
<p className="text-sm text-gray-600">Browse products, filter, and add to cart — built with Next.js App Router</p>
</header>


<Catalog />


<footer className="mt-10 text-xs text-gray-500">Mini-Storefront — demo app for coursework</footer>
</div>
</main>
);
}


