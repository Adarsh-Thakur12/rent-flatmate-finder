import mongoose from "mongoose";

const compatibilitySchema = new mongoose.Schema(
    {
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        explanation: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// One compatibility record per tenant-property pair
compatibilitySchema.index(
    {
        tenant: 1,
        property: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.model(
    "Compatibility",
    compatibilitySchema
);