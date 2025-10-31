export async function GET() {
    const products = [
        {id: 1, name:'Laptop', price:1400},
        {id: 2, name:'Headphones', price:299},
        {id: 3, name:'Desk', price: 399},
        {id:4, name:'Mug', price: 16},
        {id: 5, name: 'Chair', price: 129},
        {id: 6, name: 'Pillow', price: 29},
        {id: 7, name: 'Phone', price: 899},
        {id: 8, name: 'Monitor', price: 699},
    ];

    return Response.json(products);
}

