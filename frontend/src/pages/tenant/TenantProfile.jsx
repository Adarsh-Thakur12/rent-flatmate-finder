import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getTenantProfile,
    createTenantProfile,
    updateTenantProfile,
} from "../../services/api/tenantProfile.api";

function TenantProfile() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [profileExists, setProfileExists] = useState(false);

    const [formData, setFormData] = useState({

        preferredLocation: "",

        minBudget: "",

        maxBudget: "",

        moveInDate: "",

    });

    // ==========================
    // Load Profile
    // ==========================

    const fetchProfile = async () => {

        try {

            const response =
                await getTenantProfile();

            setFormData({

                preferredLocation:
                    response.profile.preferredLocation || "",

                minBudget:
                    response.profile.minBudget || "",

                maxBudget:
                    response.profile.maxBudget || "",

                moveInDate:
                    response.profile.moveInDate
                        ? response.profile.moveInDate.substring(0, 10)
                        : "",

            });

            setProfileExists(true);

        } catch (error) {

            if (
                error.response?.status !== 404
            ) {

                toast.error(
                    "Failed to load profile"
                );

            }

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);
        // ==========================
    // Handle Input Change
    // ==========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    // ==========================
    // Save Profile
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            if (

                !formData.preferredLocation ||

                !formData.minBudget ||

                !formData.maxBudget ||

                !formData.moveInDate

            ) {

                toast.error(
                    "Please fill all fields"
                );

                return;

            }

            if (

                Number(formData.minBudget) >

                Number(formData.maxBudget)

            ) {

                toast.error(
                    "Minimum budget cannot be greater than maximum budget"
                );

                return;

            }

            const payload = {

                ...formData,

                minBudget: Number(
                    formData.minBudget
                ),

                maxBudget: Number(
                    formData.maxBudget
                ),

            };

            let response;

            if (profileExists) {

                response =
                    await updateTenantProfile(
                        payload
                    );

            } else {

                response =
                    await createTenantProfile(
                        payload
                    );

                setProfileExists(true);

            }

            toast.success(
                response.message
            );

        } catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.message ||

                "Failed to save profile"

            );

        } finally {

            setSaving(false);

        }

    };
        // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <h2 className="text-2xl font-semibold">

                    Loading Profile...

                </h2>

            </div>

        );

    }

    return (

        <div className="max-w-4xl mx-auto py-10 px-4">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold">

                    Tenant Profile

                </h1>

                <p className="text-gray-500 mt-2">

                    Complete your profile to receive better AI compatibility
                    scores and personalized property recommendations.

                </p>

            </div>

            <form

                onSubmit={handleSubmit}

                className="bg-white rounded-2xl shadow-lg p-8 space-y-8"

            >

                {/* Preferred Location */}

                <div>

                    <label className="block font-semibold mb-2">

                        Preferred Location

                    </label>

                    <input

                        type="text"

                        name="preferredLocation"

                        value={formData.preferredLocation}

                        onChange={handleChange}

                        placeholder="e.g. HSR Layout, Bengaluru"

                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>

                {/* Budget */}

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block font-semibold mb-2">

                            Minimum Budget

                        </label>

                        <input

                            type="number"

                            name="minBudget"

                            value={formData.minBudget}

                            onChange={handleChange}

                            placeholder="10000"

                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                    <div>

                        <label className="block font-semibold mb-2">

                            Maximum Budget

                        </label>

                        <input

                            type="number"

                            name="maxBudget"

                            value={formData.maxBudget}

                            onChange={handleChange}

                            placeholder="25000"

                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

                        />

                    </div>

                </div>

                {/* Move-in Date */}

                <div>

                    <label className="block font-semibold mb-2">

                        Expected Move-in Date

                    </label>

                    <input

                        type="date"

                        name="moveInDate"

                        value={formData.moveInDate}

                        onChange={handleChange}

                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"

                    />

                </div>

                {/* Submit */}

                <div className="flex justify-end">

                    <button

                        type="submit"

                        disabled={saving}

                        className={`px-8 py-3 rounded-lg text-white font-semibold transition ${
                            saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}

                    >

                        {

                            saving

                                ? "Saving..."

                                : profileExists

                                ? "Update Profile"

                                : "Create Profile"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

}

export default TenantProfile;