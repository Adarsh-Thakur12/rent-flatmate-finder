import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { uploadPropertyImage } from "../../services/api/property.api";

function ImageUploader({ images, setImages }) {

    const inputRef = useRef(null);

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("image", file);

            const response = await uploadPropertyImage(formData);

            setImages((prev) => [
                ...prev,
                response.imageUrl,
            ]);

            toast.success("Image uploaded successfully");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to upload image"
            );

        } finally {

            setUploading(false);

        }

    };

    const removeImage = (index) => {

        setImages((prev) =>
            prev.filter((_, i) => i !== index)
        );

    };

    return (

        <div className="space-y-5">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold">

                    Property Images

                </h2>

                <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    disabled={uploading}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >

                    {

                        uploading

                            ? "Uploading..."

                            : "Upload Image"

                    }

                </button>

            </div>

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageUpload}
                className="hidden"
            />

            {

                images.length === 0 && (

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-500">

                        No Images Uploaded

                    </div>

                )

            }

            {

                images.length > 0 && (

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                        {

                            images.map((image, index) => (

                                <div
                                    key={index}
                                    className="relative"
                                >

                                    <img
                                        src={image}
                                        alt="Property"
                                        className="rounded-xl h-48 w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeImage(index)
                                        }
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 hover:bg-red-700"
                                    >

                                        ✕

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

export default ImageUploader;