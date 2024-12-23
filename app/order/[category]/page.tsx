import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category,
            },
        },
    });
    return products;
}

async function OrderPage({ params }: { params: { category: string } }) {
    const products = await getProducts(params.category);
    return (
        <>
            <h1 className="text-4xl mt-5 mb-10 font-bold">
                Elige y personaliza tu pedido
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}

export default OrderPage;
