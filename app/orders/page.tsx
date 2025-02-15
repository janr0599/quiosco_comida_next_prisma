"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/orders/LatestOrderItem";

function OrdersPage() {
    const url = "/orders/api";
    const fetcher = () =>
        fetch(url)
            .then((res) => res.json())
            .then((data) => data);

    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(
        url,
        fetcher,
        {
            refreshInterval: 60000,
        }
    );

    if (isLoading) return <p>Cargando...</p>;

    if (data)
        return (
            <>
                <h1 className="text-center mt-10 text-6xl font-bold">
                    Ordenes Listas
                </h1>
                <Logo />
                {data.length ? (
                    <div className="grid grid-cols-3 gap-5 max-w-5xl mx-auto my-10">
                        {data.map((order) => (
                            <LatestOrderItem key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center my-10">
                        No hay ordenes pendientes
                    </p>
                )}
            </>
        );
}

export default OrdersPage;
