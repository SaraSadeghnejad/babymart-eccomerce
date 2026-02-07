import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createBrand,
  updateBrand,
  getBrandById,
  getBrands,
  deleteBrand,
} from "../controllers/brandController.js";

const router = express.Router();
router.route("/").get(getBrands).post(protect, admin, createBrand);

router
  .route("/:id")
  .get(getBrandById)
  .put(protect, admin, updateBrand)
  .delete(protect, admin, deleteBrand);

export default router;
