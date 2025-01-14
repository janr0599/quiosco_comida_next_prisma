"use client";
import { searchProductSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function ProductSearchForm() {
    const router = useRouter();

    const handleSearchForm = async (formData: FormData) => {
        const data = {
            search: formData.get("search"),
        };
        const result = searchProductSchema.safeParse(data);
        console.log(result);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });
            return;
        }
        router.push(`/admin/products/search?search=${result.data.search}`);
    };

    return (
        <form className="flex items-center" action={handleSearchForm}>
            <input
                type="text"
                placeholder="Buscar producto"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />
            <input
                type="submit"
                value={"Buscar"}
                className="bg-indigo-600 text-white p-2 uppercase cursor-pointer"
            />
        </form>
    );
}

export default ProductSearchForm;
