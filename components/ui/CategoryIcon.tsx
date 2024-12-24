"use client";

import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
    category: Category;
};

function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{ category: string }>();
    return (
        <Link
            href={`/order/${category.slug}`}
            className={`${
                category.slug === params.category ? "bg-amber-400" : ""
            } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:cursor-pointer`}
        >
            <div className="size-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt={`icono de ${category.name}`}
                />
            </div>
            <p className="text-xl font-bold">{category.name}</p>
        </Link>
    );
}

export default CategoryIcon;
