import { formatPrice } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";

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
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <p className="mt-5 font-black text-4xl text-amber-500">
                        {formatPrice(product.price)}
                    </p>
                </div>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 font-bold py-2 px-4 rounded uppercase cursor-pointer transition-colors"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
