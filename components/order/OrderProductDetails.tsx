import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatPrice } from "@/src/utils";
import { MinusIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type OrderProductDetailsProps = {
    item: OrderItem;
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

function OrderProductDetails({ item }: OrderProductDetailsProps) {
    const increaseQuantity = useStore((state) => state.increaseQuantity);
    const decreaseQuantity = useStore((state) => state.decreaseQuantity);
    const removeItem = useStore((state) => state.removeItem);

    const disableDecreaseButton = useMemo(
        () => item.quantity === MIN_ITEMS,
        [item]
    );
    const disableIncreaseButton = useMemo(
        () => item.quantity === MAX_ITEMS,
        [item]
    );

    return (
        <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 rounded-lg">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button type="button" onClick={() => removeItem(item.id)}>
                        <XCircleIcon className="text-red-600 hover:scale-105 transition-transform size-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatPrice(item.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={disableDecreaseButton}
                        className="disabled:opacity-20"
                    >
                        <MinusIcon className="size-6" />
                    </button>

                    <p className="text-lg font-black ">{item.quantity}</p>

                    <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={disableIncreaseButton}
                        className="disabled:opacity-20"
                    >
                        <PlusIcon className="size-6" />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {""}
                    <span className="font-normal">
                        {formatPrice(item.subtotal)}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default OrderProductDetails;
