import {
    Home,
    MapPin,
    IndianRupee,
    BedDouble,
    Bath,
    Car,
    User,
    FileText,
    Building2,
} from "lucide-react";

function PropertyForm({
    formData,
    setFormData,
}) {

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

    };

    return (

        <div className="bg-white rounded-3xl shadow-lg p-8">

            {/* Heading */}

            <div className="flex items-center gap-3 mb-8">

                <Building2
                    size={34}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-3xl font-bold">

                        Property Details

                    </h2>

                    <p className="text-gray-500">

                        Enter complete information about your property.

                    </p>

                </div>

            </div>

            {/* Property Title */}

            <div className="mb-8">

                <label className="flex items-center gap-2 font-semibold mb-2">

                    <Home size={18} />

                    Property Title

                    <span className="text-red-500">*</span>

                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Luxury 2 BHK Apartment"
                    className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />

            </div>

            {/* Description */}

            <div className="mb-8">

                <label className="flex items-center gap-2 font-semibold mb-2">

                    <FileText size={18} />

                    Description

                    <span className="text-red-500">*</span>

                </label>

                <textarea
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property..."
                    className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />

            </div>
                        {/* Location */}

            <div className="mt-10">

                <h3 className="text-2xl font-semibold mb-6">

                    Location Details

                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* City */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-2">

                            <MapPin size={18} />

                            City

                            <span className="text-red-500">*</span>

                        </label>

                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="e.g. Bengaluru"
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                    {/* Locality */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-2">

                            <MapPin size={18} />

                            Locality

                            <span className="text-red-500">*</span>

                        </label>

                        <input
                            type="text"
                            name="locality"
                            value={formData.locality}
                            onChange={handleChange}
                            placeholder="e.g. Whitefield"
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />

                    </div>

                </div>

                {/* Address */}

                <div className="mt-6">

                    <label className="flex items-center gap-2 font-medium mb-2">

                        <MapPin size={18} />

                        Complete Address

                        <span className="text-red-500">*</span>

                    </label>

                    <textarea
                        rows={4}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter complete property address..."
                        className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />

                </div>

            </div>
                        {/* Property Specifications */}

            <div className="mt-10">

                <h3 className="text-2xl font-semibold mb-6">

                    Property Specifications

                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Rent */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-2">

                            <IndianRupee size={18} />

                            Monthly Rent

                            <span className="text-red-500">*</span>

                        </label>

                        <input
                            type="number"
                            name="rent"
                            value={formData.rent}
                            onChange={handleChange}
                            placeholder="15000"
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    {/* BHK */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-2">

                            <BedDouble size={18} />

                            BHK

                            <span className="text-red-500">*</span>

                        </label>

                        <select
                            name="bhk"
                            value={formData.bhk}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        >

                            <option value="">Select BHK</option>
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                            <option value="4">4 BHK</option>
                            <option value="5">5 BHK</option>

                        </select>

                    </div>

                    {/* Bathrooms */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-2">

                            <Bath size={18} />

                            Bathrooms

                            <span className="text-red-500">*</span>

                        </label>

                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            placeholder="2"
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                    </div>

                    {/* Furnished */}

                    <div>

                        <label className="font-medium mb-2 block">

                            Furnished

                            <span className="text-red-500 ml-1">*</span>

                        </label>

                        <select
                            name="furnished"
                            value={formData.furnished}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        >

                            <option value="">Select</option>

                            <option value="Furnished">
                                Furnished
                            </option>

                            <option value="Semi-Furnished">
                                Semi-Furnished
                            </option>

                            <option value="Unfurnished">
                                Unfurnished
                            </option>

                        </select>

                    </div>

                </div>

            </div>

            {/* Preferences */}

            <div className="mt-10">

                <h3 className="text-2xl font-semibold mb-6">

                    Preferences

                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Gender Preference */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-2">

                            <User size={18} />

                            Gender Preference

                        </label>

                        <select
                            name="genderPreference"
                            value={formData.genderPreference}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                        >

                            <option value="Any">
                                Any
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                        </select>

                    </div>

                    {/* Parking */}

                    <div>

                        <label className="flex items-center gap-2 font-medium mb-4">

                            <Car size={18} />

                            Parking Available

                        </label>

                        <label className="inline-flex items-center gap-3 cursor-pointer">

                            <input
                                type="checkbox"
                                name="parking"
                                checked={formData.parking}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />

                            <span className="text-gray-700">

                                Yes, Parking is Available

                            </span>

                        </label>

                    </div>

                </div>

            </div>
                        {/* Divider */}

            <hr className="my-10 border-gray-200" />

            {/* Tips */}

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

                <h3 className="text-lg font-semibold text-blue-700 mb-3">

                    Tips for Better Listings

                </h3>

                <ul className="list-disc list-inside text-gray-700 space-y-2">

                    <li>
                        Write a descriptive title that clearly identifies your property.
                    </li>

                    <li>
                        Mention nearby metro stations, colleges, offices or landmarks.
                    </li>

                    <li>
                        Include all amenities in the description.
                    </li>

                    <li>
                        Upload multiple high-quality images to attract more tenants.
                    </li>

                    <li>
                        Ensure rent and address information are accurate.
                    </li>

                </ul>

            </div>

        </div>

    );

}

export default PropertyForm;