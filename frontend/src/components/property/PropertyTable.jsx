import {
    Pencil,
    Trash2,
    CheckCircle,
    MapPin,
} from "lucide-react";

function PropertyTable({

    properties,

    onEdit,

    onDelete,

    onMarkFilled,

}) {

    if (!properties.length) {

        return (

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

                <h2 className="text-2xl font-bold text-gray-700">

                    No Properties Found

                </h2>

                <p className="text-gray-500 mt-3">

                    Start by adding your first property.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Header */}

            <div className="bg-blue-600 text-white px-8 py-5">

                <h2 className="text-2xl font-bold">

                    My Properties

                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100 text-left">

                            <th className="px-6 py-4">

                                Image

                            </th>

                            <th className="px-6 py-4">

                                Property

                            </th>

                            <th className="px-6 py-4">

                                Rent

                            </th>

                            <th className="px-6 py-4">

                                Status

                            </th>

                            <th className="px-6 py-4">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>
                                                {properties.map((property) => (

                            <tr
                                key={property._id}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                {/* Image */}

                                <td className="px-6 py-4">

                                    <img
                                        src={
                                            property.images?.length
                                                ? property.images[0]
                                                : "https://placehold.co/120x80?text=No+Image"
                                        }
                                        alt={property.title}
                                        className="w-28 h-20 object-cover rounded-lg"
                                    />

                                </td>

                                {/* Property Info */}

                                <td className="px-6 py-4">

                                    <h3 className="font-bold text-lg">

                                        {property.title}

                                    </h3>

                                    <div className="flex items-center gap-2 text-gray-500 mt-1">

                                        <MapPin size={16} />

                                        <span>

                                            {property.locality},{" "}
                                            {property.city}

                                        </span>

                                    </div>

                                    <div className="mt-2 text-sm text-gray-600">

                                        {property.bhk} BHK •{" "}
                                        {property.bathrooms} Bath

                                    </div>

                                </td>

                                {/* Rent */}

                                <td className="px-6 py-4">

                                    <span className="text-xl font-bold text-blue-600">

                                        ₹{property.rent}

                                    </span>

                                    <p className="text-sm text-gray-500">

                                        / month

                                    </p>

                                </td>

                                {/* Status */}

                                <td className="px-6 py-4">

                                    {property.isFilled ? (

                                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm">

                                            Filled

                                        </span>

                                    ) : (

                                        <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">

                                            Available

                                        </span>

                                    )}

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <button
                                            onClick={() =>
                                                onEdit(property)
                                            }
                                            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                                            title="Edit Property"
                                        >

                                            <Pencil size={18} />

                                        </button>

                                        <button
                                            onClick={() =>
                                                onDelete(property._id)
                                            }
                                            className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
                                            title="Delete Property"
                                        >

                                            <Trash2 size={18} />

                                        </button>

                                        {!property.isFilled && (

                                            <button
                                                onClick={() =>
                                                    onMarkFilled(property._id)
                                                }
                                                className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                                                title="Mark Filled"
                                            >

                                                <CheckCircle size={18} />

                                            </button>

                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}
                                        </tbody>

                </table>

            </div>

            {/* Footer */}

            <div className="bg-gray-50 px-8 py-4 flex justify-between items-center">

                <p className="text-gray-600">

                    Total Properties:
                    <span className="font-semibold ml-2">

                        {properties.length}

                    </span>

                </p>

                <p className="text-sm text-gray-500">

                    Manage your listings from here.

                </p>

            </div>

        </div>

    );

}

export default PropertyTable;