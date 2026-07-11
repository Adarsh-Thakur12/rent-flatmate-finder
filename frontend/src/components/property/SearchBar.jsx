import { useState } from "react";

function SearchBar({ onSearch }) {

    const [filters, setFilters] = useState({
        search: "",
        city: "",
        locality: "",
        bhk: "",
    });

    const handleChange = (e) => {

        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSearch(filters);

    };

    const handleReset = () => {

        const resetFilters = {
            search: "",
            city: "",
            locality: "",
            bhk: "",
        };

        setFilters(resetFilters);

        onSearch(resetFilters);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-2xl p-6"
        >

            <h2 className="text-2xl font-bold mb-6">

                Search Properties

            </h2>

            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">

                <input
                    type="text"
                    name="search"
                    placeholder="Property Title"
                    value={filters.search}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={filters.city}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <input
                    type="text"
                    name="locality"
                    placeholder="Locality"
                    value={filters.locality}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                />

                <select
                    name="bhk"
                    value={filters.bhk}
                    onChange={handleChange}
                    className="border rounded-lg p-3"
                >

                    <option value="">BHK</option>

                    <option value="1">1 BHK</option>

                    <option value="2">2 BHK</option>

                    <option value="3">3 BHK</option>

                    <option value="4">4 BHK</option>

                    <option value="5">5 BHK</option>

                </select>

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Reset
                    </button>

                </div>

            </div>

        </form>

    );

}

export default SearchBar;