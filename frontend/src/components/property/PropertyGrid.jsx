import PropertyCard from "./PropertyCard";

function PropertyGrid({
    properties = [],
    loading = false,
}) {

    if (loading) {

        return (

            <div className="flex justify-center items-center py-20">

                <div className="text-2xl font-semibold text-gray-500">
                    Loading Properties...
                </div>

            </div>

        );

    }

    if (properties.length === 0) {

        return (

            <div className="flex justify-center items-center py-20">

                <div className="text-2xl font-semibold text-gray-500">

                    No Properties Found

                </div>

            </div>

        );

    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {properties.map((property) => (

                <PropertyCard
                    key={property._id}
                    property={property}
                />

            ))}

        </div>

    );

}

export default PropertyGrid;