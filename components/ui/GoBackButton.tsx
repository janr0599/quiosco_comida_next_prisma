"use client";
import { useRouter } from "next/navigation";

function GoBackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer rounded-md"
        >
            Volver
        </button>
    );
}

export default GoBackButton;
