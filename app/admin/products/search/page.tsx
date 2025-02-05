import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsTable from "@/components/products/ProductsTable";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive",
            },
        },
        include: {
            category: true,
        },
    });
    return products;
}

async function searchPage({
    searchParams,
}: {
    searchParams: { search: string };
}) {
    const products = await searchProducts(searchParams.search);
    return (
        <>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <GoBackButton />
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductsTable products={products} />
            ) : (
                <div className="text-center">
                    <p className=" mt-10 text-2xl font-bold">
                        No hay productos para mostrar
                    </p>
                </div>
            )}
        </>
    );
}

export default searchPage;
