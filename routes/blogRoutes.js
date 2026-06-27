const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
    getBlogs,
    createBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogById
} = require("../controllers/blogController");

// ======================
// PUBLIC ROUTES
// ======================

// Read all blogs
router.get("/", getBlogs);

// Temporary test route
router.get("/create", createBlog);

// Read single blog
router.get("/:id", getBlogById);

// ======================
// PROTECTED ROUTES
// ======================

// Create Blog
router.post(
    "/",
    verifyToken,
    upload.single("image"),
    addBlog
);

// Update Blog
router.put(
    "/:id",
    verifyToken,
    upload.single("image"),
    updateBlog
);

// Delete Blog
router.delete(
    "/:id",
    verifyToken,
    deleteBlog
);

module.exports = router;