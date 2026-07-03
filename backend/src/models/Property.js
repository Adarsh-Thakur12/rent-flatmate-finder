import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    rent: {
      type: Number,
      required: true,
      min: 0,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    locality: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    bhk: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },

    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },

    furnished: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
      required: true,
    },

    parking: {
      type: Boolean,
      default: false,
    },

    genderPreference: {
      type: String,
      enum: ["Male", "Female", "Any"],
      default: "Any",
    },

    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;