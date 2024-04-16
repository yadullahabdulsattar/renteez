const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Controller methods
const addListing = async (req, res, next) => {
  const userId = req.user._id;
  const {
    title,
    description,
    picture,
    address,
    postalCode,
    city,
    surface,
    roomCount,
    rent,
    charges,
    transport,
    elevator,
    internet,
    electricity,
    water,
    parking,
    disability,
  } = req.body;

  if (
    !title ||
    !description ||
    !picture ||
    !address ||
    !postalCode ||
    !city ||
    !surface ||
    !roomCount ||
    !rent ||
    !charges ||
    !transport
  ) {
    return res
      .status(400)
      .json({ message: "Please provide the details of your listing" });
  }
  try {
    const listing = await Listing.create({
      title,
      description,
      picture,
      address,
      postalCode,
      city,
      surface,
      roomCount,
      rent,
      charges,
      transport,
      elevator,
      internet,
      electricity,
      water,
      parking,
      disability,
      createdBy: userId,
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({}).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUserListings = async (req, res, next) => {
  try {
    const createdBy = req.user._id;
    const listings = await Listing.find({ createdBy }).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such listing found" });
    }
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "No such listing found" });
    }
    const user = await User.findById(listing.createdBy);
    if (user) {
      const responseListing = {
        ...listing._doc,
        createdBy: user.first_name,
        contactEmail: user.email,
        contactPhone: user.phone,
      };
      res.status(200).json(responseListing);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFiltered = async (req, res) => {
  const {
    postalCode,
    city,
    surface,
    roomCount,
    rent,
    transport,
    elevator,
    internet,
    electricity,
    water,
    parking,
    disability,
  } = req.body;

  try {
    const filter = {};

    if (postalCode) {
      filter.postalCode = postalCode;
    }
    if (city) {
      filter.city = city;
    }
    switch (surface) {
      case "-20":
        filter.surface = { $lt: 20 };
        break;
      case "20-40":
        filter.surface = { $gte: 20, $lt: 40 };
        break;
      case "40-50":
        filter.surface = { $gte: 40, $lt: 50 };
        break;
      case "50-100":
        filter.surface = { $gte: 50, $lt: 100 };
        break;
      case "100+":
        filter.surface = { $gte: 100 };
        break;
    }
    switch (roomCount) {
      case "1-2":
        filter.roomCount = { $gte: 1, $lte: 2 };
        break;
      case "2-3":
        filter.roomCount = { $gte: 2, $lte: 3 };
        break;
      case "3-4":
        filter.roomCount = { $gte: 3, $lte: 4 };
        break;
      case "4+":
        filter.roomCount = { $gt: 4 };
        break;
    }

    switch (rent) {
      case "-400":
        filter.rent = { $lt: 400 };
        break;
      case "400-500":
        filter.rent = { $gte: 400, $lt: 500 };
        break;
      case "500-600":
        filter.rent = { $gte: 500, $lt: 600 };
        break;
      case "600-700":
        filter.rent = { $gte: 600, $lt: 700 };
        break;
      case "700+":
        filter.rent = { $gte: 700 };
        break;
    }

    switch (transport) {
      case "-100":
        filter.transport = { $lt: 100 };
        break;
      case "100-150":
        filter.transport = { $gte: 100, $lt: 150 };
        break;
      case "150-300":
        filter.transport = { $gte: 150, $lt: 300 };
        break;
      case "300-500":
        filter.transport = { $gte: 300, $lt: 500 };
        break;
      case "500+":
        filter.transport = { $gte: 500 };
        break;
    }

    if (elevator) {
      filter.elevator = elevator;
    }
    if (internet) {
      filter.internet = internet;
    }
    if (electricity) {
      filter.electricity = electricity;
    }
    if (water) {
      filter.water = water;
    }
    if (parking) {
      filter.parking = parking;
    }
    if (disability) {
      filter.disability = disability;
    }
    console.log(filter);
    // Perform the query with the constructed filter.
    const query = Listing.find(filter).sort({ createdAt: -1 });

    const filteredListings = await query.exec();

    // Send the filtered listings as a response.
    res.status(200).json(filteredListings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "No such listing found" });
  }
  try {
    const listing = await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: id + " has been deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const changeListingDetails = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such listing found" });
  }
  try {
    const oldListing = await Listing.findById(id);
    if (!oldListing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    const listing = await Listing.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addListing,
  getAllListings,
  getAllUserListings,
  getDetailsById,
  getFiltered,
  deleteListing,
  changeListingDetails,
};
