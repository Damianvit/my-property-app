"use client";

import { useState } from "react";
import { submitProperty } from "../actions/submitProperty";
import Link from "next/link";

type PropertyType = keyof typeof featureSets;

export default function PropertyListingPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            await submitProperty(data);
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
        <main className="max-w-4xl mx-auto p-6 bg-navy-100  shadow-md rounded-lg ">
            <Link
                href="/"
                type="button"
                className=" bg-blue-900 text-white font-bold rounded-md hover:bg-navy-700 transition-all duration-150 ease-in-out active:scale-95 w-fit p-2"
            >
                Home
            </Link>
            <h1 className="text-2xl text-center font-bold text-gray-800 dark:text-white mb-4 dark:text-white">
                List a Property
            </h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    console.log("formData >>>>>>>", formData);
                    await handleSubmit(formData);
                }}
                className="space-y-6 dark:text-white"
            >
                <div>
                    <label className={`${labelClass} `}>Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className={`${inputClass} dark:text-white`}
                    />
                </div>
                <div className="">
                    <label className={`${labelClass} `}>Description</label>
                    <textarea
                        name="description"
                        required
                        className={`${inputClass} dark:text-white`}
                    ></textarea>
                </div>
                <div>
                    <label className={`${labelClass} `}>Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        className={`${inputClass} `}
                    />
                </div>

                <div className="flex">
                    <div>
                        <label className={`${labelClass} `}>City</label>
                        <input
                            type="text"
                            name="city"
                            className={`${inputClass} `}
                        />
                    </div>

                    <div className="px-2">
                        <label className={`${labelClass} `}>State</label>
                        <input
                            type="text"
                            name="state"
                            className={`${inputClass} `}
                        />
                    </div>

                    <div>
                        <label className={`${labelClass} `}>Country</label>
                        <input
                            type="text"
                            name="country"
                            className={`${inputClass} `}
                        />
                    </div>
                </div>
                <div>
                    <label className={`${labelClass} `}>Price</label>
                    <input
                        type="number"
                        name="price"
                        required
                        className={`${inputClass} `}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className=" bg-blue-900 text-white font-bold rounded-md hover:bg-navy-700 transition-all duration-150 ease-in-out active:scale-95 w-full p-3"
                >
                    Submit Property
                </button>
                <div> {loading && <div className="spinner"></div>}</div>
            </form>
            {status && (
                <div>
                    <p className="mt-4 mb-2 text-center text-gray-700 dark:text-white">
                        {status}
                    </p>
                    <Link
                        href="/"
                        type="button"
                        className=" bg-blue-900 text-white font-bold rounded-md hover:bg-navy-700 transition-all duration-150 ease-in-out active:scale-95 w-fit p-2"
                    >
                        Home
                    </Link>
                </div>
            )}
        </main>
    );
}
