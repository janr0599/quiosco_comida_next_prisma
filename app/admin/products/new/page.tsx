import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";

function CreateProductPage() {
    return (
        <>
            <Heading>Nuevo Producto</Heading>
            <GoBackButton />
            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    );
}

export default CreateProductPage;
