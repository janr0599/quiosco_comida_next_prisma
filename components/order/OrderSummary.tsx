"use client";
import { useStore } from "@/src/store";
import OrderProductDetails from "./OrderProductDetails";
import { formatPrice } from "@/src/utils";
import { useMemo } from "react";

function OrderSummary() {
    const order = useStore((state) => state.order);
    const total = useMemo(
        () => order.reduce((acc, item) => acc + item.subtotal, 0),
        [order]
    );

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
            {order.length === 0 ? (
                <p className="text-center my-10">La orden está vacía</p>
            ) : (
                <>
                    <div className="mt-5 space-y-4">
                        {order.map((item) => (
                            <OrderProductDetails key={item.id} item={item} />
                        ))}
                    </div>
                    <p className="text-2xl mt-10 text-center">
                        Total a pagar: {""}
                        <span className="font-bold">{formatPrice(total)}</span>
                    </p>
                </>
            )}
        </aside>
    );
}

export default OrderSummary;
