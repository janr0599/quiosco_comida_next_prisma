import { formatPrice } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <div
            key={product.id}
            className="border bg-white shadow rounded-lg flex flex-col h-full"
        >
            <Image
                src={`/products/${product.image}.jpg`}
                width={400}
                height={400}
                alt={`Imagen de ${product.name}`}
                className="rounded-t-lg"
            />
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg xl:text-xl font-bold">
                        {product.name}
                    </h3>
                    <p className="mt-5 font-black text-xl xl:text-2xl text-amber-500">
                        {formatPrice(product.price)}
                    </p>
                </div>
                <AddProductButton product={product} />
            </div>
        </div>
    );
}

export default ProductCard;
