const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    surface: {
      type: Number,
      required: true,
    },
    roomCount: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    charges: {
      type: Number,
      required: true,
    },
    transport: {
      type: Number,
      required: true,
    },
    //service
    elevator: {
      type: Boolean,
      required: true,
    },
    //service
    internet: {
      type: Boolean,
      required: true,
    },
    //service
    electricity: {
      type: Boolean,
      required: true,
    },
    //service
    water: {
      type: Boolean,
      required: true,
    },
    //service
    parking: {
      type: Boolean,
      required: true,
    },
    //service
    disability: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
