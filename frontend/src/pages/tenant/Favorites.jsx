import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PropertyCard from "../../components/property/PropertyCard";

import {
    getMyFavorites,
    removeFavorite,
} from "../../services/api/favorite.api";
 import * as FavoriteAPI from "../../services/api/favorite.api";

console.log(FavoriteAPI);

function Favorites() {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchFavorites();

    }, []);

    const fetchFavorites = async () => {

        try {

            const data = await FavoriteAPI.getMyFavorites();

            setFavorites(data.favorites);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load favorites");

        } finally {

            setLoading(false);

        }

    };

    const handleRemove = async (propertyId) => {

        try {

            await removeFavorite(propertyId);

            toast.success("Removed from favorites");

            setFavorites((prev) =>
                prev.filter(
                    (fav) => fav.property._id !== propertyId
                )
            );

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Failed to remove favorite"
            );

        }

    };

    if (loading) {

        return (

            <div className="text-center py-20 text-xl">

                Loading Favorites...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    My Favorites

                </h1>

                <span className="text-gray-500">

                    {favorites.length} Saved

                </span>

            </div>

            {

                favorites.length === 0 ? (

                    <div className="text-center py-20 text-2xl text-gray-500">

                        No Favorite Properties

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {

                            favorites.map((favorite) => (

                                <div
                                    key={favorite._id}
                                    className="relative"
                                >

                                    <PropertyCard
                                        property={favorite.property}
                                    />

                                    <button

                                        onClick={() =>
                                            handleRemove(
                                                favorite.property._id
                                            )
                                        }

                                        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

                                    >

                                        Remove

                                    </button>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default Favorites;