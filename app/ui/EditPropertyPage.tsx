"use client";

import { useState } from "react";
import { editProperty } from "../actions/editProperty";
import ResidentialFeatures from "./ResidentialFeatures";
import CommercialFeatures from "./CommercialFeatures";
import IndustrialFeatures from "./IndustrialFeatures";
import LandFeatures from "./LandFeatures";
import featureSets from "../actions/featureSets";
import ContactPicker from "@/app/contacts/ui/ContactPicker";

type PropertyType = keyof typeof featureSets;

export default function EditPropertyPage({ property }: { property: any }) {
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [propertyType, setPropertyType] = useState<PropertyType>(
        property.propertyType
    ); // Use PropertyType here
    const [selectedFeatures, setSelectedFeatures] = useState<
        Record<string, boolean>
    >(featureSets[propertyType]);

    const handleFeatureSelection = (feature: string, value: boolean) => {
        setSelectedFeatures((prev) => ({ ...prev, [feature]: value }));
    };
    const handlePropertyTypeChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newPropertyType = e.target.value as PropertyType;
        setPropertyType(newPropertyType);
        setSelectedFeatures(featureSets[newPropertyType]);
    };
    const handleSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await editProperty(property.id, data);
            setStatus("Property listed successfully!");
        } catch (error) {
            setStatus("Failed to list property.");
        } finally {
            setLoading(false);
        }
    };
    const inputClass =
        "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    const labelClass = "block text-gray-700 dark:text-white font-medium mb-2";

    return (
        <main className="mx-auto p-6 bg-navy-100 shadow-md dark:bg-gray-800 dark:text-sky-100 rounded-lg">
            <h1 className="text-2xl text-center font-bold  text-gray-800 mb-4">
                List a Property
            </h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await handleSubmit(formData);
                }}
                className="space-y-6"
            >
                {/* Common form fields */}
                <div>
                    <label className={`${labelClass} `}>Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={property.title}
                        required
                        className={`${inputClass} dark:text-white`}
                    />
                </div>
                <div>
                    <label className={`${labelClass} `}>Description</label>
                    <textarea
                        name="description"
                        defaultValue={property.description}
                        required
                        className={`${inputClass} dark:text-white`}
                    ></textarea>
                </div>
                <div>
                    <label className={`${labelClass} `}>Location</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={property.location}
                        required
                        className={`${inputClass} dark:text-white`}
                    />
                </div>

                <div className="flex">
                    <div>
                        <label className={`${labelClass} `}>City</label>
                        <input
                            type="text"
                            name="city"
                            defaultValue={property.city}
                            className={`${inputClass} dark:text-white`}
                        />
                    </div>

                    <div className="px-2">
                        <label className={`${labelClass} `}>State</label>
                        <input
                            type="text"
                            name="state"
                            defaultValue={property.state}
                            className={`${inputClass} dark:text-white`}
                        />
                    </div>

                    <div>
                        <label className={`${labelClass} `}>Country</label>
                        <input
                            type="text"
                            name="country"
                            defaultValue={property.country}
                            className={`${inputClass} dark:text-white`}
                        />
                    </div>
                </div>
                <div>
                    <label className={`${labelClass} `}>Price</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={property.price}
                        required
                        className={`${inputClass} dark:text-white`}
                    />
                </div>
                <ContactPicker />
                <div>
                    <label className={`${labelClass} `}>Property Type</label>
                    <select
                        name="propertyType"
                        value={propertyType}
                        onChange={handlePropertyTypeChange}
                        required
                        className={`${inputClass} dark:text-white`}
                    >
                        <option value="RESIDENTIAL">Residential</option>
                        <option value="LAND">Land</option>
                        <option value="COMMERCIAL">Commercial</option>
                        <option value="INDUSTRIAL">Industrial</option>
                    </select>
                </div>

                {/* Feature Inputs */}
                {/* Render the appropriate feature component based on property type */}
                {propertyType === "RESIDENTIAL" && (
                    <ResidentialFeatures selectedFeatures={selectedFeatures} />
                )}
                {propertyType === "LAND" && (
                    <LandFeatures selectedFeatures={selectedFeatures} />
                )}
                {propertyType === "COMMERCIAL" && (
                    <CommercialFeatures selectedFeatures={selectedFeatures} />
                )}
                {propertyType === "INDUSTRIAL" && (
                    <IndustrialFeatures selectedFeatures={selectedFeatures} />
                )}
                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-navy-900 text-white font-bold rounded-md hover:bg-navy-700 transition-all duration-150 ease-in-out active:scale-95 "
                >
                    Submit Property
                </button>
                <div> {loading && <div className="spinner"></div>}</div>
            </form>
            {status && (
                <p className="mt-4 text-center mb-4 dark:text-white text-gray-700">
                    {status}
                </p>
            )}

            {/* Features Selection */}
            <div className="flex flex-wrap">
                {Object.keys(selectedFeatures).map((feature) => (
                    <div key={feature} className="m-1">
                        <div
                            onClick={() =>
                                handleFeatureSelection(
                                    feature,
                                    !selectedFeatures[feature]
                                )
                            }
                            className={`cursor-pointer  text-[0.75rem] text-white p-1 rounded-md text-xs-sm w-fit transition-all duration-150 ease-in-out active:scale-95 ${
                                selectedFeatures[feature]
                                    ? "bg-navy-900"
                                    : "bg-navy-400 dark:text-white text-gray-900"
                            }`}
                        >
                            {feature
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
