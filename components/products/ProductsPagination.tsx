import Link from "next/link";
import { useMemo } from "react";

type ProductsPaginationProps = {
    page: number;
    totalPages: number;
};

function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
    const canPreviousPage = useMemo(() => page > 1, [page]);
    const canNextPage = useMemo(() => page < totalPages, [page, totalPages]);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center py-10">
            {canPreviousPage && (
                <Link
                    className="bg-white px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-50 transition-colors"
                    href={`/admin/products?page=${page - 1}`}
                >
                    &laquo;
                </Link>
            )}

            {pages.map((currentPage) => {
                return (
                    <Link
                        key={currentPage}
                        href={`/admin/products?page=${currentPage}`}
                        className={`${
                            page === currentPage ? "bg-amber-400" : "bg-white"
                        } px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 transition-colors`}
                    >
                        {currentPage}
                    </Link>
                );
            })}

            {canNextPage && (
                <Link
                    className="bg-white px-4 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 hover:bg-gray-50 transition-colors"
                    href={`/admin/products?page=${page + 1}`}
                >
                    &raquo;
                </Link>
            )}
        </nav>
    );
}

export default ProductsPagination;
