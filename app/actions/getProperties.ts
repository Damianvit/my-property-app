// app/actions/getProperties.ts
import { unstable_noStore as noStore } from "next/cache";
import { Prisma, PropertyType } from "@prisma/client"; // Import Prisma
import { FilterType } from "@/types/FilterType";

import prisma from "@/lib/prisma";

export async function getProperties(
    skip: number = 0,
    take: number = 15,
    filters: FilterType
) {
    const where: Prisma.PropertyWhereInput = {};

    if (filters.query) {
        where.OR = [
            {
                title: {
                    contains: filters.query,
                    mode: Prisma.QueryMode.insensitive,
                },
            },
            {
                description: {
                    contains: filters.query,
                    mode: Prisma.QueryMode.insensitive,
                },
            },
        ];
    }

    console.log("Final WHERE Clause:", JSON.stringify(where));

    const properties = await prisma.property.findMany({
        where,
        skip,
        take,
        orderBy: {
            listedAt: "desc",
        },
    });

    const count = await prisma.property.count({ where });

    const hasMore = skip + take < count;

    return { properties: properties, hasMore };
}
