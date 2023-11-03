import express from "express";
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  getProfile,
  getProfilesByUser,
} from "../controller/profile.js";

const router = express.Router();

router.get("/:id", getProfile);
// router.get('/', getProfiles)
router.get("/", getProfilesByUser);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;
