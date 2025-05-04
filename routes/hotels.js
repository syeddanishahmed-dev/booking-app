import express from "express";

import Hotel from "../models/Hotel.js";
import { getHotels, updateHotel } from "../controllers/hotel.js";
import { createHotel } from '../controllers/hotel.js';
import { deleteHotel } from '../controllers/hotel.js';
import { getHotel } from '../controllers/hotel.js';

import { get } from "mongoose";


const router = express.Router();


//CREATE

router.post("/", createHotel)

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL

router.get("/", getHotels);

export default router;