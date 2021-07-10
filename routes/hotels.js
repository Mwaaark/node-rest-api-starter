const express = require("express");
const router = express.Router();

const hotels = require("../controllers/hotels");

router.route("/").get(hotels.index).post(hotels.createHotel);

router
  .route("/:id")
  .get(hotels.showHotel)
  .patch(hotels.updateHotel)
  .delete(hotels.deleteHotel);

module.exports = router;
