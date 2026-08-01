import express from "express";
import { getMedia, addMedia, deleteMedia, updateBulkMedia } from "../controllers/mediaController.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import { uploadAndCompress } from "../middleware/imageUploadMiddleware.js";

const router = express.Router();

router.get("/", getMedia);
router.post("/", authenticate, requireAdmin, uploadAndCompress("files", 30), addMedia);
router.put("/bulk", authenticate, requireAdmin, updateBulkMedia);
router.delete("/:id", authenticate, requireAdmin, deleteMedia);

export default router;
