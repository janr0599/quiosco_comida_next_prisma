"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
    product: Product;
};

function AddProductButton({ product }: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder);
    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 font-bold py-2 px-4 rounded uppercase cursor-pointer transition-colors"
            onClick={() => addToOrder(product)}
        >
            Agregar
        </button>
    );
}

export default AddProductButton;
