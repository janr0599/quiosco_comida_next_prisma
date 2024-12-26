"use client";
import { useStore } from "@/src/store";
import OrderProductDetails from "./OrderProductDetails";
import { formatPrice } from "@/src/utils";
import { useMemo } from "react";
import { createOrderAction } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

function OrderSummary() {
    const order = useStore((state) => state.order);
    const total = useMemo(
        () => order.reduce((acc, item) => acc + item.subtotal, 0),
        [order]
    );
    const clearOrder = useStore((state) => state.clearOrder);

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            total,
            order,
        };

        const result = OrderSchema.safeParse(data);
        console.log(result);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });
            return;
        }

        const response = await createOrderAction(data);
        if (response?.errors) {
            response.errors.forEach((error) => {
                toast.error(error.message);
            });

            return;
        }

        toast.success("Pedido creado correctamente");
        clearOrder();
    };

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
                    <form
                        className="w-full mt-10 space-y-5"
                        action={handleCreateOrder}
                    >
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="bg-white border border-gray-100 p-2 rounded-lg w-full"
                            name="name"
                        />
                        <input
                            type="submit"
                            className="py-2 rounded-lg uppercase text-white bg-black w-full text-center cursor-pointer hover:bg-opacity-80 transition-opacity font-bold"
                            value="Confirmar pedido"
                        />
                    </form>
                </>
            )}
        </aside>
    );
}

export default OrderSummary;
