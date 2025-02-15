import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

async function getPendingOrders() {
    const orders = await prisma.order.findMany({
        where: {
            status: false,
        },
        include: {
            orderProducts: {
                include: {
                    product: true,
                },
            },
        },
    });
    return orders;
}

async function OrdersPage() {
    const orders = await getPendingOrders();
    const refreshOrders = async () => {
        "use server";
        revalidatePath("/admin/orders");
    };
    return (
        <>
            <Heading>Administrar Ordenes</Heading>
            <form action={refreshOrders}>
                <input
                    type="submit"
                    value="Actualizar Ordenes"
                    className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-md"
                />
            </form>
            {orders.length ? (
                <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <p className="text-center">No hay ordenes pendientes</p>
            )}
        </>
    );
}

export default OrdersPage;
