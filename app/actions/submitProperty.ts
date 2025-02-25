"use server";

import prisma, { Prisma } from "@/lib/prisma";

export async function submitProperty(data: FormData) {
    const propertyData: Prisma.PropertyCreateInput = {
        title: data.get("title") as string,
        description: data.get("description") as string,
        location: data.get("location") as string,
        price: parseFloat(data.get("price") as string),
        city: (data.get("city") as string) || undefined,
        state: (data.get("state") as string) || undefined,
        country: (data.get("country") as string) || undefined,
    };

    console.log("Property data >>>>>>>>>>>", propertyData);
    await prisma.property.create({
        data: propertyData,
    });
}
