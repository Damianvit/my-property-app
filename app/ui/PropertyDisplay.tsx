//@/app/ui/PropertyDisplay.tsx
import { FilterType } from "@/types/FilterType";
import { getProperties } from "@/app/actions/getProperties";
import { toWords } from "number-to-words";
import PaginationController from "./PaginationController";
import { GiExpand } from "react-icons/gi";
import { Suspense } from "react";

export default async function PropertyDisplay(filters: FilterType) {
    const skip = ((filters.page || 1) - 1) * 10;
    const { properties, hasMore } = await getProperties(skip, 10, filters);

    function formatNumberWithCommas(value: number): string {
        return value.toLocaleString();
    }
    function convertNumberToWords(value: number): string {
        return toWords(value);
    }
    function capitalizeWords(fullName: string): string {
        const namePattern = /(\b\w|\s+\w)/g;
        return fullName.replace(namePattern, (match) => match.toUpperCase());
    }

    return (
        <div className="overflow-y-scroll">
            {properties.map((property, index) => (
                <div
                    id={`property-${index + 1}`}
                    key={property.id}
                    className="h-full flex shadow-md dark:shadow-neutral-400 mb-16 flex-col  p-4 "
                >
                    <h2 className="text-2xl dark:bg-neutral-900 bg-neutral-900  w-full  text-center rounded-md  text-white font-bold mb-4">
                        {property.title}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                        <div className="rounded-md bg-gray-100 dark:bg-neutral-800  dark:text-sky-100  p-2">
                            <p className="text-sm ">
                                Location: {property.location}{" "}
                            </p>
                            <p className="text-sm">
                                {property.city && `${property.city}, `}
                                {property.state && `${property.state}, `}
                                {property.country && property.country}
                            </p>
                        </div>
                        <div className="rounded-md bg-gray-100 dark:bg-gray-800 dark:text-sky-100 p-2 dark:bg-neutral-800">
                            <p className="text-sm ">
                                Price: {formatNumberWithCommas(property.price)}
                            </p>
                            <p className="text-xs text-gray-500">
                                ({" "}
                                {capitalizeWords(
                                    convertNumberToWords(property.price)
                                )}
                                )
                            </p>
                        </div>
                    </div>
                    <div className="rounded-md bg-gray-100 w-full text-center p-4  mb-4 dark:bg-neutral-800 dark:text-sky-100">
                        <p className="text-sm text-left break-words whitespace-pre-wrap">
                            {property.description}
                        </p>
                    </div>
                </div>
            ))}
            <PaginationController
                currentPage={filters.page ?? 1}
                hasMore={hasMore}
            />
        </div>
    );
}
