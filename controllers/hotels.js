const Hotel = require("../models/hotel");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res, next) => {
  let hotels;

  try {
    hotels = await Hotel.find();
  } catch (error) {
    const err = new ExpressError(
      "Something went wrong, could not fetch data",
      500
    );
    return next(err);
  }

  if (!hotels || hotels.length === 0) {
    const err = new ExpressError("No available hotels", 404);
    return next(err);
  }

  res.status(200).json({ hotels });
};

module.exports.createHotel = async (req, res, next) => {
  const hotel = new Hotel({
    name: "Test",
  });

  try {
    await hotel.save();
  } catch (error) {
    const err = new ExpressError("Something went wrong, please try again", 500);
    return next(err);
  }

  res.status(201).json({ hotel });
};

module.exports.showHotel = async (req, res, next) => {
  let hotel;

  try {
    hotel = await Hotel.findById(req.params.id);
  } catch (error) {
    const err = new ExpressError(
      "Something went wrong, could not fetch data",
      500
    );
    return next(err);
  }

  if (!hotel) {
    const err = new ExpressError(
      "Could not find a hotel for the provided id",
      404
    );
    return next(err);
  }

  res.status(200).json({ hotel });
};

module.exports.updateHotel = async (req, res, next) => {
  let hotel;
  const name = "Test edited";

  try {
    hotel = await Hotel.findById(req.params.id);
  } catch (error) {
    const err = new ExpressError(
      "Something went wrong, could not update data",
      500
    );
    return next(err);
  }

  if (!hotel) {
    const err = new ExpressError(
      "Could not find a hotel for the provided id",
      404
    );
    return next(err);
  }

  hotel.name = name;

  try {
    await hotel.save();
  } catch (error) {
    const err = new ExpressError(
      "Something went wrong, could not update hotel",
      500
    );
    return next(err);
  }

  res.status(200).json({ hotel });
};

module.exports.deleteHotel = async (req, res, next) => {
  let hotel;

  try {
    hotel = await Hotel.findByIdAndDelete(req.params.id);
  } catch (error) {
    const err = new ExpressError(
      "Something went wrong, could not delete data",
      500
    );
    return next(err);
  }

  if (!hotel) {
    const err = new ExpressError(
      "Could not find a hotel for the provided id",
      404
    );
    return next(err);
  }

  res.status(200).json({ hotel, message: "Hotel successfully deleted" });
};
