import { useEffect, useState } from "react";
import SearchBar from "../../components/property/SearchBar";
import PropertyGrid from "../../components/property/PropertyGrid";
import { getAllProperties } from "../../services/api/property.api";

function Home() {

    const [properties, setProperties] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchProperties = async (filters = {}) => {

        try {

            setLoading(true);

            const query = new URLSearchParams();

            Object.keys(filters).forEach((key) => {

                if (filters[key]) {

                    query.append(key, filters[key]);

                }

            });

            const data = await getAllProperties(query.toString());

            setProperties(data.properties || []);

            setError("");

        } catch (error) {

            console.error(error);

            setError("Failed to load properties.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProperties();

    }, []);

    return (

        <div className="space-y-12">

            {/* Hero Section */}

            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl py-20 px-10 text-white">

                <div className="max-w-5xl mx-auto text-center">

                    <h1 className="text-5xl font-bold">

                        Find Your Perfect Flat & Flatmate

                    </h1>

                    <p className="mt-6 text-lg text-blue-100">

                        AI-powered rental platform with smart recommendations,
                        compatibility matching and real-time communication.

                    </p>

                </div>

            </section>

            {/* Search */}

            <SearchBar onSearch={fetchProperties} />

            {/* Featured Heading */}

            <div className="flex justify-between items-center">

                <h2 className="text-3xl font-bold">

                    Available Properties

                </h2>

                <span className="text-gray-600">

                    {properties.length} Properties Found

                </span>

            </div>

            {/* Error */}

            {error && (

                <div className="bg-red-100 text-red-700 p-4 rounded-lg">

                    {error}

                </div>

            )}

            {/* Property Grid */}

            <PropertyGrid

                properties={properties}

                loading={loading}

            />

        </div>

    );

}

export default Home;