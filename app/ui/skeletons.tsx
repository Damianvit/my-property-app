export const PropertyDisplaySkeleton = () => {
    return (
        <div className="overflow-y-scroll">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="h-full flex shadow-md dark:shadow-neutral-400 mb-16 flex-col justify-center items-center p-4 animate-pulse"
                >
                    <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded-md w-full mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                        <div className="h-16 bg-neutral-300 dark:bg-neutral-700 rounded-md"></div>
                        <div className="h-16 bg-neutral-300 dark:bg-neutral-700 rounded-md"></div>
                    </div>
                    <div className="h-24 bg-neutral-300 dark:bg-neutral-700 rounded-md w-full mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 text-xs-sm mb-4 w-full">
                        <div>
                            <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded-md w-3/4 mb-2"></div>
                            <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded-md w-3/4"></div>
                        </div>
                        <div className="flex items-center justify-end px-4">
                            <div className="h-6 w-6 bg-neutral-300 dark:bg-neutral-700 rounded-full mr-2"></div>
                            <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded-md w-1/2"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export function DetailedControllerSkeleton() {
    return (
        <div>
            {/* Skeleton for action buttons */}
            <div className="flex items-center text-sm justify-end px-4">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse mx-2"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse mx-2"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse mx-2"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse mx-2"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse mx-2"></div>
                <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse mx-2"></div>
            </div>
        </div>
    );
}
