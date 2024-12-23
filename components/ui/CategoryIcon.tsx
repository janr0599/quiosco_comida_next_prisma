import { Category } from "@prisma/client";
import Image from "next/image";

type CategoryIconProps = {
    category: Category;
};

function CategoryIcon({ category }: CategoryIconProps) {
    return (
        <div
            className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:bg-gray-100 transition-colors hover:cursor-pointer`}
        >
            <div className="size-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt={`icono de ${category.name}`}
                />
            </div>
            <p className="text-xl font-bold">{category.name}</p>
        </div>
    );
}

export default CategoryIcon;
