"use server";

import prisma, { Prisma } from "@/lib/prisma";
import getSession from "@/lib/getSession";
import { PropertyType } from "@prisma/client"; // Import the PropertyType enum

export async function editProperty(propertyId: string, data: FormData) {
    const propertyType = data.get("propertyType") as string;
    const session = await getSession();
    const userId = session?.user.id;

    if (userId) {
        // Check if the property exists and belongs to the user
        const existingProperty = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { ownerId: true },
        });

        if (!existingProperty || existingProperty.ownerId !== userId) {
            throw new Error(
                "Property not found or you do not have permission to edit this property."
            );
        }

        const propertyData: Prisma.PropertyUpdateInput = {
            title: data.get("title") as string,
            description: data.get("description") as string,
            propertyType: data.get("propertyType") as PropertyType, // Type assertion to PropertyType
            location: data.get("location") as string,
            price: parseFloat(data.get("price") as string),
            city: (data.get("city") as string) || undefined,
            state: (data.get("state") as string) || undefined,
            country: (data.get("country") as string) || undefined,
        };

        const featuresMapping: Record<string, string[]> = {
            RESIDENTIAL: [
                "bedrooms",
                "bathrooms",
                "garageSpaces",
                "livingRoom",
                "diningRoom",
                "familyRoom",
                "kitchen",
                "garageSize",
                "driveway",
                "frontYard",
                "backYard",
                "patio",
                "garden",
                "basement",
                "attic",
                "laundry",
                "hvac",
                "fireplace",
                "flooring",
                "closets",
            ],
            COMMERCIAL: [
                "commercialProperyType",
                "squareFootage",
                "accessibility",
                "footTraffic",
                "publicTransportation",
                "highwayAccess",
                "parkingFacilities",
                "buildingInfrastructure",
                "securityFeatures",
                "zoningAndLandUse",
                "leaseTerms",
                "utilitiesAndServices",
                "floorLayout",
                "tenantImprovements",
                "adaCompliance",
                "signage",
                "buildingClass",
                "ceilingHeight",
                "energyEfficiency",
                "fireSafety",
                "occupancyRates",
                "proximityToSuppliersAndCustomers",
                "expansionPotential",
            ],
            INDUSTRIAL: [
                "zoningType",
                "ceilingHeight",
                "loadingDocks",
                "powerSupply",
                "floorLoadCapacity",
                "cranesAndEquipment",
                "sprinklerSystem",
                "ventilation",
                "outdoorStorage",
                "accessToTransportation",
                "wasteDisposalFacilities",
                "environmentalCompliance",
                "securityFeatures",
                "parkingForHeavyVehicles",
            ],
            LAND: [
                "landSizeArea",
                "lenght",
                "width",
                "plots",
                "shape",
                "slope",
                "drainage",
                "topography",
                "zoningClassification",
                "soilTypeAndQuality",
                "utilitiesAvailability",
                "roadAccess",
                "waterFeatures",
                "UtilitiesAvailable",
                "floodZoneStatus",
                "easementsAndRightsOfWay",
                "landUseRestrictions",
                "environmentalConcerns",
                "proximityToInfrastructure",
                "potentialForSubdivision",
                "landTenureAndOwnershipRights",
                "naturalResources",
                "landscapingAndVegetation",
                "developmentPotential",
                "boundaryMarkersAndFencing",
                "historicalSignificance",
                "marketValueAndAppreciation",
            ],
        };

        const selectedFeatures = featuresMapping[propertyType];
        if (selectedFeatures) {
            selectedFeatures.forEach((feature) => {
                const value = data.get(feature);
                if (value) {
                    (propertyData as any)[feature] =
                        isNaN(Number(value)) || value === ""
                            ? value
                            : parseFloat(value as string) ||
                              parseInt(value as string, 10);
                }
            });
        }

        // Update the existing property
        await prisma.property.update({
            where: { id: propertyId },
            data: propertyData,
        });
    }
}
