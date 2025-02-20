"use client";
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";

function OrdersPage() {
    const url = "/admin/orders/api";
    const fetcher = () =>
        fetch(url)
            .then((res) => res.json())
            .then((data) => data);

    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
    });

    if (isLoading) return <p>Cargando...</p>;

    if (data)
        return (
            <>
                <Heading>Administrar Ordenes</Heading>

                {data.length ? (
                    <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((order) => (
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
