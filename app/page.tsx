//@/app/page.tsx
import Image from "next/image";
import PropertyDisplay from "@/app/ui/PropertyDisplay";
import { Suspense } from "react";
import { PropertyDisplaySkeleton } from "@/app/ui/skeletons";

export default async function Home(props: {
    searchParams?: Promise<FilterType>;
}) {
    const searchParams = await props.searchParams;

    const filters: FilterType = {
        query: searchParams?.query || "",
        page: Number(searchParams?.page) || 1,
    };

    return (
        <main className="">
            <div className="pt-[84px] overflow-auto">
                <Suspense fallback={<PropertyDisplaySkeleton />}>
                    <PropertyDisplay {...filters} />
                </Suspense>
            </div>
        </main>
    );
}
