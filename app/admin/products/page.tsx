import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function getProductsCount() {
    return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true,
        },
    });
    return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

async function ProductsPage({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const page = +searchParams.page || 1;
    const pageSize = 10;

    if (page < 0) redirect("/admin/products");

    const productsData = getProducts(page, pageSize);
    const totalProductsData = getProductsCount();

    const [products, totalProducts] = await Promise.all([
        productsData,
        totalProductsData,
    ]);

    const totalPages = Math.ceil(totalProducts / pageSize);

    if (page > totalPages) redirect("/admin/products");

    return (
        <>
            <Heading>Administrar Productos</Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link
                    href="/admin/products/new"
                    className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-md"
                >
                    Crear Producto
                </Link>
                <ProductSearchForm />
            </div>
            <ProductsTable products={products} />
            <ProductsPagination page={page} totalPages={totalPages} />
        </>
    );
}

export default ProductsPage;
