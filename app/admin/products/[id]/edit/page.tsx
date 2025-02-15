import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });
    if (!product) {
        notFound(); // redirect to 404 page if product not found
    }

    return product;
}

async function EditProductsPage({ params }: { params: { id: any } }) {
    const product = await getProductById(+params.id);
    console.log(product);
    return (
        <>
            <Heading>Editar producto: {product.name}</Heading>
            <GoBackButton />
            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    );
}

export default EditProductsPage;
