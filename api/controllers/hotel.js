import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

// ✅ UPDATED getHotels
export const getHotels = async (req, res, next) => {
  const { min = 1, max = 999, limit, featured, ...others } = req.query;

  try {
    const hotels = await Hotel.find({
      ...others,
      ...(featured !== undefined && { featured: featured === "true" }),
      cheapestPrice: { $gt: parseInt(min), $lt: parseInt(max) },
    }).limit(limit ? parseInt(limit) : 0);

    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const appartmentCount = await Hotel.countDocuments({ type: "appartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "appartments", count: appartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};
