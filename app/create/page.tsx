// app/create/page.tsx
import PropertyListingPage from "@/app/ui/PropertyListingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create",
    description: "List your Real Estate Property",
};

export default function Page() {
    return (
        <main>
            <PropertyListingPage />
        </main>
    );
}
