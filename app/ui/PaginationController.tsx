// app/ui/PaginationController.tsx

"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

type PaginationControllerProps = {
    currentPage: number;
    hasMore: boolean;
};

export default function PaginationController({
    currentPage,
    hasMore,
}: PaginationControllerProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="pagination flex justify-center gap-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 border rounded"
            >
                Prev
            </button>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasMore}
                className="px-4 py-2 border rounded"
            >
                Next
            </button>
        </div>
    );
}
